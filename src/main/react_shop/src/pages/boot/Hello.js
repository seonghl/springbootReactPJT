import React, {useEffect, useState} from 'react';

import gCommonNet from '../../utils/commonNet'
const Hello = ()  => {
    const [hello, setHello] = useState('')
 
    useEffect(() => {
        let url = '/api/hello';
        let param = {};
        gCommonNet.gFnCallAjax(url, param, ((res) => {setHello(res.data)}))
    }, []);

     return (
             <div>
                 백엔드에서 가져온 데이터입니다 : {hello}
             </div>
     )
 }
 
 export default Hello;
