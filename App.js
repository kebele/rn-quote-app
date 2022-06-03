import {View, Text, TouchableOpacity, StatusBar, Linking} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Tts from 'react-native-tts';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';

Tts.setDefaultLanguage('en-GB');
Tts.setDefaultVoice('com.apple.ttsbundle.Moira-compact');
Tts.setDefaultRate(0.5);
Tts.setDefaultPitch(1.2);

const App = () => {
  const [quote, setQuote] = useState('loading...');
  const [author, setAuthor] = useState('loading...');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const randomQuote = () => {
    setIsLoading(true);
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        // console.log(result.content);
        setQuote(result.content);
        setAuthor(result.author);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    randomQuote();
  }, []);

  const speakNow = () => {
    Tts.stop();
    Tts.speak(quote + ' by ' + author);
    Tts.addEventListener('tts-start', e => setIsSpeaking(true));
    Tts.addEventListener('tts-finish', e => setIsSpeaking(false));
  };

  const copyToClipboard = () => {
    Clipboard.setString(quote);
    Snackbar.show({
      text: 'quote copied!',
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  const tweetNow = () => {
    const url = 'https://twitter.com/intent/tweet?text=' + quote;
    Linking.openURL(url);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
      }}>
      <StatusBar barStyle="light-content" />
      <View
        style={{
          width: '90%',
          backgroundColor: 'whitesmoke',
          borderRadius: 20,
          padding: 20,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 26,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Quotable
        </Text>
        <FontAwesome5
          name="quote-left"
          style={{fontSize: 20, color: '#000', marginBottom: -12}}
        />
        <Text
          style={{
            fontSize: 16,
            lineHeight: 26,
            letterSpacing: 1.1,
            textAlign: 'center',
            marginBottom: 10,
            paddingHorizontal: 30,
          }}>
          {quote}
        </Text>
        <FontAwesome5
          name="quote-right"
          style={{
            fontSize: 20,
            color: '#000',
            textAlign: 'right',
            marginTop: -15,
          }}
        />
        <Text
          style={{
            textAlign: 'right',
            fontStyle: 'italic',
            fontSize: 16,
            marginVertical: 20,
          }}>
          --{author}
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={speakNow}
            style={{
              borderWidth: 2,
              borderColor: 'steelblue',
              borderRadius: 50,
              padding: 15,
              color: isSpeaking ? 'orange' : 'crimson',
            }}>
            <FontAwesome
              name="volume-up"
              size={22}
              color={isSpeaking ? 'crimson' : 'teal'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={copyToClipboard}
            style={{
              borderWidth: 2,
              borderColor: 'steelblue',
              borderRadius: 50,
              padding: 15,
            }}>
            <FontAwesome5 name="copy" size={22} color="teal" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={tweetNow}
            style={{
              borderWidth: 2,
              borderColor: 'teal',
              borderRadius: 50,
              padding: 15,
            }}>
            <FontAwesome name="twitter" size={22} color="teal" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={randomQuote}
          style={{
            backgroundColor: isLoading ? 'orange' : 'crimson',
            padding: 20,
            borderRadius: 30,
            marginVertical: 30,
            marginTop: 30,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {isLoading ? 'loading...' : 'new quote'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
