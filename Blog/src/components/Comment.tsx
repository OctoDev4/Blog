import { useState } from "react"
import { Avatar } from "./Avatar"
import styles from "./Comment.module.css"
import {Trash, ThumbsUp} from "phosphor-react"


interface CommentProps{
    content:string;
    onDeleteComment:(commentToDelete:string) => void;

}


export function Comment({content,onDeleteComment}:CommentProps){

    const [likeCount,setLikeCount] = useState(0)

    function handleDeleteComment(){
     onDeleteComment(content)
    }
    function handleLikeComent(){
        setLikeCount((prev)=>{
            return prev + 1
        })
        
    }

    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/felipealmeidaweb.png"/>
            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                      <div className={styles.authorAndTime}>
                    <strong>Felipe Almeida</strong>
                    <p>{content}</p>
                    <time dateTime="2022-05-11 08:13:30">
                    publicado há cerca de 1 hora
                    </time>
                     </div>
                     <button onClick={handleDeleteComment} title="Deletar comentario">
                        <Trash size={24}/>
                     </button>
                    </header>
                  
                </div>
                <footer>
                    <button onClick={handleLikeComent}>
                     <ThumbsUp/>
                     Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>

            </div>

        </div>
    )

}