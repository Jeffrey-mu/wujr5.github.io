import Cosmic from 'cosmicjs';
import AES from 'crypto-js/aes';
import md5 from 'crypto-js/md5';
import encUtf8 from 'crypto-js/enc-utf8';
import Promise from 'promise';

const api = Cosmic();

export function getWriteKey(pass) {
  return new Promise((resolve, reject) => {
    let password = pass ? pass : prompt('访问密码：');
    if (!password) {
      reject();
      return;
    }

    api
      .bucket({
        slug: '4d7c8cd0-2822-11ec-8e75-2f845ec5c57c',
        read_key: 'KW8eCqNzGJ8U05aYWCUNHKueNH5COLxAOv1Ou71XIPArrTIDeU',
      })
      .getObjects({
        query: {
          type: 'auths',
          $and: [{ 'metadata.username': 'admin' }, { 'metadata.password': md5(password).toString() }],
        },
        limit: 200,
      })
      .then((res) => {
        let key = AES.decrypt(res.objects[0].metadata.extend.posts_write_key, password).toString(encUtf8);
        resolve(key);
      })
      .catch((err) => {
        // 授权失败，关闭页面
        window.close();
        reject();
      });
  });
}
