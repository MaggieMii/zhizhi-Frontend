import { useEffect ,useState} from 'react';
import { View } from '@tarojs/components';
import Check from '../../components/Check';
import Taro from '@tarojs/taro';

const Index = () => {

  const [photoPath, setPhotoPath] = useState('');

  

  useEffect(() => {
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
      
      <Check photoPath={photoPath}/>
    </View>
  );
};

export default Index;
