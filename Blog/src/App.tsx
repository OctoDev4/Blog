
import {Header} from './components/Header';
import styles from "./App.module.css";
import {Post} from "./components/Post"
import { Sidebar } from './components/Sidebar';
import {PostType} from "./components/Post"



const post:PostType[]  = [
  {
   id:1,
   author:{
    avatarUrl:"https://github.com/felipealmeidaweb.png",
    name:"Felipe Almeida",
    role:"Web Developerr"
   },
   content:[
    {type:"paragraph" , content:"Fala galera"},
    {type:"paragraph" , content:"Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"},
    {type:"link" , content:"jane.design/doctorcare"}
   ],
   publishAt: new Date("2022-05-03 20:00:00")
  },

  {
    id:2,
    author:{
     avatarUrl:"https://github.com/felipealmeidaweb.png",
     name:"Felipe Almeida",
     role:"Web Developer"
    },
    content:[
     {type:"paragraph" , content:"Fala galera"},
     {type:"paragraph" , content:"Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀"},
     {type:"link" , content:"jane.design/doctorcare"}
    ],
    publishAt: new Date("2022-05-03 20:00:00")
   },
];


function App() {
  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
        {post.map(post => {
    return( 
    <Post
     key={post.id}
     post={post}/>
    )
})}

        </main>
      </div>
    </div>
  );
}

export default App;
