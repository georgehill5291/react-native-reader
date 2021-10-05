import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View, StyleSheet, Dimensions} from 'react-native';
import {BookContext} from '../context/BookContext';
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  Center,
  HStack,
  Stack,
  NativeBaseProvider,
  Button,
} from 'native-base';

import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import ProcessBar from '../components/shared/ProcessBar';
import Storage from '../helper/Storage';
import theme from './../assets/theme';

const BookDetailScreen = ({route, navigation}) => {
  const {bookId} = route.params;

  const {
    bookState: {bookDetail},
    findBookById,
  } = useContext(BookContext);

  const [localBookDetail, setLocalBookDetail] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [processPercent, setProcessPercent] = useState(0);

  useEffect(async () => {
    let localBooks = await Storage.getItem('downloadedBooks');
    // console.log('localBook', localBooks);
    if (localBooks) {
      const currentLocalBook = localBooks.find(t => t._id === bookId);
      if (currentLocalBook) {
        // alert(currentLocalBook.localFile);
        setLocalBookDetail(currentLocalBook);
      } else {
        findBookById(bookId);
      }
    } else {
      findBookById(bookId);
    }
  }, []);

  useEffect(async () => {
    setLocalBookDetail(bookDetail);
  }, [bookDetail]);

  const onPressDownload = () => {
    const url = bookDetail.bookFile.fileUrl;
    const fileName = url.split('/').pop();
    const localFile = `${RNFS.ExternalDirectoryPath}/${fileName}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
      progress: res => {
        let progressPercent = Math.round(
          (res.bytesWritten / res.contentLength) * 100,
        ); // to calculate in percentage
        console.log('\n\nprogress===', progressPercent);
        setProcessPercent(progressPercent);
      },
    };

    setModalVisible(true);
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(async () => {
        // success
        setModalVisible(false);
        const newBook = {
          ...bookDetail,
          islocal: true,
          localFile: localFile,
        };
        setLocalBookDetail(newBook);

        let currentLocalBooks = await Storage.getItem('downloadedBooks');
        console.log('currentLocalBooks', currentLocalBooks);
        if (currentLocalBooks) {
          var isExist = currentLocalBooks.find(a => a._id === bookDetail._id);
          if (!isExist) {
            currentLocalBooks.push(newBook);
            // console.log('multi books', currentLocalBooks);
            await Storage.setItem('downloadedBooks', currentLocalBooks);
          }
        } else {
          let books = [];
          books.push(newBook);
          await Storage.setItem('downloadedBooks', books);
        }
      })
      .catch(error => {
        // error
        setModalVisible(false);
        alert(error);
      });
  };

  const onPressRead = () => {
    FileViewer.open(localBookDetail.localFile);
  };

  const processProps = {modalVisible, setModalVisible, processPercent};

  return (
    <View style={theme.paddingTop30}>
      {localBookDetail && (
        <Box
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}>
          <Box>
            <AspectRatio ratio={16 / 9}>
              <Image
                key={new Date().getTime()}
                source={{
                  uri:
                    localBookDetail.imageFile.imageUrl.replace(
                      '-original',
                      '-related',
                    ) +
                    '?time' +
                    new Date().getTime(),
                  headers: {Pragma: 'no-cache'},
                }}
                alt="image"
              />
            </AspectRatio>
            <Center
              bg="violet.500"
              _dark={{
                bg: 'violet.400',
              }}
              _text={{
                color: 'warmGray.50',
                fontWeight: '700',
                fontSize: 'xs',
              }}
              position="absolute"
              bottom="0"
              px="3"
              py="1.5">
              PHOTOS
            </Center>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                {localBookDetail.title['en']}
              </Heading>
              <Text
                fontSize="xs"
                _light={{
                  color: 'violet.500',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1">
                {localBookDetail.classifications.map(t => t.title).join(',')}
              </Text>
            </Stack>
            <Text fontWeight="400">
              {localBookDetail.description['en'].replace(/<[^>]+>/g, '')}
            </Text>
            {/* <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between">
              <HStack alignItems="center">
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontWeight="400">
                  6 mins ago
                </Text>
              </HStack>
            </HStack> */}
          </Stack>
          {localBookDetail.localFile ? (
            <TouchableOpacity
              onPress={onPressRead}
              style={styles.downLoadButtonText}>
              <Text>Read</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={onPressDownload}
              style={styles.downLoadButtonText}>
              <Text>Download</Text>
            </TouchableOpacity>
          )}
        </Box>
      )}
      <ProcessBar {...processProps} />
    </View>
  );
};

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  downLoadButtonText: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default BookDetailScreen;
