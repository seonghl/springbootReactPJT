
const HelloSpringboot = ()  => {
    const [hello, setHello] = useState('')
 
     useEffect(() => {
         axios.get('/api/hello')
         .then(response => {setHello(response.data); console.log(response); console.log("aafhhaa");})
         .catch(error => console.log(error))
      }, []);
 
     return (
         <Layout>
             <div>
                 백엔드에서 가져온 데이터입니다 : {hello}
             </div>
         </Layout>
     )
 }
 
 export default HelloSpringboot;
