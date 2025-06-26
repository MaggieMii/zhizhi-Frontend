import { useEffect ,useState} from 'react';
import { View } from '@tarojs/components';
import Check from '../../components/Check';
import Taro from '@tarojs/taro';
import { post } from '@/fetch';

const Index = () => {

  const [photoPath, setPhotoPath] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    post('/chat/start-session/').then((res) => {
      console.log(res);
      setSessionId(res.session_id);
    });
    console.log('sessionId', sessionId);
    const getParams = () => {
      const instance = Taro.getCurrentInstance();
      const params = instance?.router?.params || {};
      const photoPath = params?.photoPath;

      if (photoPath) {
        setPhotoPath(decodeURIComponent(photoPath));
        console.log(decodeURIComponent(photoPath));
      }
    };

    getParams();
  }, []);

  return (
    <View className="index">
      <Check photoPath={photoPath} sessionId={sessionId as string} />
    </View>
  );
};

export default Index;
