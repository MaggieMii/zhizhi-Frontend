import Taro from "@tarojs/taro";

const preUrl = "http://47.121.133.22:8000/api";

export const getToken = () => {
  return new Promise((resolve, reject) => {
    Taro.getStorage({
      key: "token",
      success: (res) => {
        const token = res.data;
        if (token) {
          resolve(token); // 如果token存在，解析Promise
        } else {
          reject(new Error("No token found")); // 如果没有token，拒绝Promise
          Taro.navigateTo({ url: "/pages/login/index" }); // 导航到登录页面
        }
      },
      fail: (err) => {
        reject(new Error(`Failed to get token: ${err}`)); // 存储操作失败时拒绝Promise
      }
    });
  });
}

export async function post(url = '', data = {}, isToken = true) {
  const header = {
    'Content-Type': 'application/json;charset=utf-8',
  };


  if (isToken) header["Authorization"] = `Bearer ${await getToken()}`;

  try {
    const response = await Taro.request({
      url: `${preUrl}${url}`,
      method: 'POST',
      header,
      data: JSON.stringify(data),
    });

    if (!response.statusCode.toString().startsWith('2')) {
      if (response.statusCode === 401) {
        throw new Error('401');
      } else if (response.statusCode === 400) {
        const errorData = response.data as { code: number; msg: string };
        throw new Error(`${errorData.code}`);
      }
    }

    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function get(url = '', isToken = true) {
  const header = {
    'Content-Type': 'application/json;charset=utf-8',
  };

  const getToken = () => {
    return new Promise((resolve, reject) => {
      Taro.getStorage({
        key: "token",
        success: (res) => {
          const token = res.data;
          if (token) {
            resolve(token); // 如果token存在，解析Promise
          } else {
            reject(new Error("No token found")); // 如果没有token，拒绝Promise
            Taro.navigateTo({ url: "/pages/login/index" }); // 导航到登录页面
          }
        },
        fail: (err) => {
          reject(new Error(`Failed to get token: ${err}`)); // 存储操作失败时拒绝Promise
        }
      });
    });
  }

  if (isToken) header["Authorization"] = `Bearer ${await getToken()}`;

  try {
    const response = await Taro.request({
      url: `${preUrl}${url}`,
      method: 'GET',
      header,
      // redirect: 'follow',
    });

    if (!response.statusCode.toString().startsWith('2')) {
      if (response.statusCode === 401) {
        throw new Error('401');
      } else if (response.statusCode === 400) {
        const errorData = response.data as { code: number; msg: string };
        throw new Error(`${errorData.code}`);
      }
    }

    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function put(url = '', data = {}, isToken = true) {
  const header = {
    'Content-Type': 'application/json;charset=utf-8',
  };

  if (isToken) {
    Taro.getStorage({
      key: 'token',
      success: (res) => {
        const token = res.data;
        if (token) header['Authorization'] = token;
        else {
          Taro.navigateTo({ url: '/pages/login/index' });
        }
      },
    });
  }

  try {
    const response = await Taro.request({
      url: `${preUrl}${url}`,
      method: 'PUT',
      header,
      data: JSON.stringify(data),
    });

    if (!response.statusCode.toString().startsWith('2')) {
      if (response.statusCode === 401) {
        throw new Error('401');
      } else if (response.statusCode === 400) {
        const errorData = response.data as { code: number; msg: string };
        throw new Error(`${errorData.code}`);
      }
    }

    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function postPwd(url = '', data = {}, token: string) {
  const header = {
    'Content-Type': 'application/json;charset=utf-8',
  };

  if (token) header['Authorization'] = token;
  else {
    Taro.navigateTo({ url: '/pages/login/index' });
  }

  try {
    const response = await Taro.request({
      url: `${preUrl}${url}`,
      method: 'POST',
      header,
      data: JSON.stringify(data),
    });

    if (!response.statusCode.toString().startsWith('2')) {
      throw new Error(`${response.statusCode}`);
    }

    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function postSession(url = '', data = {}, sessionId ='', isToken = true) {
  const header = {
    'Content-Type': 'application/json;charset=utf-8',
    'Session-ID': sessionId
  };

  const getToken = () => {
    return new Promise((resolve, reject) => {
      Taro.getStorage({
        key: "token",
        success: (res) => {
          const token = res.data;
          if (token) {
            resolve(token); // 如果token存在，解析Promise
          } else {
            reject(new Error("No token found")); // 如果没有token，拒绝Promise
            Taro.navigateTo({ url: "/pages/login/index" }); // 导航到登录页面
          }
        },
        fail: (err) => {
          reject(new Error(`Failed to get token: ${err}`)); // 存储操作失败时拒绝Promise
        }
      });
    });
  }

  if (isToken) header["Authorization"] = `Bearer ${await getToken()}`;

  try {
    const response = await Taro.request({
      url: `${preUrl}${url}`,
      method: 'POST',
      header,
      data: JSON.stringify(data)
    });

    if (!response.statusCode.toString().startsWith('2')) {
      if (response.statusCode === 401) {
        throw new Error('401');
      } else if (response.statusCode === 400) {
        const errorData = response.data as { code: number; msg: string };
        throw new Error(`${errorData.code}`);
      }
    }

    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

export async function postLogin(url = '', data = {}, isToken = true) {
  const header = {
    'Content-Type': 'application/json;charset=utf-8',
  };

  const getToken = () => {
    return new Promise((resolve, reject) => {
      Taro.getStorage({
        key: "token",
        success: (res) => {
          const token = res.data;
          if (token) {
            resolve(token); // 如果token存在，解析Promise
          } else {
            reject(new Error("No token found")); // 如果没有token，拒绝Promise
            Taro.navigateTo({ url: "/pages/login/index" }); // 导航到登录页面
          }
        },
        fail: (err) => {
          reject(new Error(`Failed to get token: ${err}`)); // 存储操作失败时拒绝Promise
        }
      });
    });
  }

  if (isToken) header["Authorization"] = `Bearer ${await getToken()}`;

  try {
    const response = await Taro.request({
      url: `https://sm.ms/api/v2${url}`,
      method: 'POST',
      header,
      data: JSON.stringify(data),
    });

    if (!response.statusCode.toString().startsWith('2')) {
      if (response.statusCode === 401) {
        throw new Error('401');
      } else if (response.statusCode === 400) {
        const errorData = response.data as { code: number; msg: string };
        throw new Error(`${errorData.code}`);
      }
    }

    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}