import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Avatar } from "./Avatar";  // Importa o componente Avatar
import { Comment } from "./Comment";  // Importa o componente Comment
import styles from "./Post.module.css";  // Importa os estilos CSS do componente Post
import { format, formatDistanceToNow } from "date-fns";  // Importa as funções format e formatDistanceToNow de date-fns
import ptBR from "date-fns/locale/pt-BR";  // Importa o localizador pt-BR de date-fns



    

interface Author{
    name:string;
    role:string;
    avatarUrl:string
}
interface Content{
    type:"paragraph"  | "link";
    content:string
}

 export interface PostType{
    id:number
    author:Author;
    publishAt:Date;
    content:Content[]

}

interface PostProps{
    post:PostType

}
// Declaração do componente Post, que recebe as propriedades author, publishAt e content
export function Post({ post}:PostProps) {

    const [comments,setComments] = useState([
       "post bacana"
    ])
    const [newCommentText,setNewCommentText] = useState("")
   const isNewCommentEmpty = newCommentText.length === 0 ;

    // Formata a data de publicação para o formato especificado, usando o local pt-BR
    const publishedDate = format(post.publishAt, "d 'de 'LLLL 'às' HH:mm'h'", {
        locale: ptBR
    });

    // Calcula a distância relativa da data de publicação até o momento atual, usando o local pt-BR
    const publishedDateRelativeToNow = formatDistanceToNow(post.publishAt, {
        locale: ptBR,
        addSuffix: true
    });

    function handleCreateNewComent(e:FormEvent){
        e.preventDefault()

         
        
        setComments([...comments, newCommentText])
        setNewCommentText("")

        console.log(comments)
        
    }
     function handleNewCommentChange(event:ChangeEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity("")
        setNewCommentText(event.target.value)

     }
     function handleNewCommentInvalid(event:InvalidEvent<HTMLTextAreaElement>){
        event.target.setCustomValidity("esse campo é obrigatório")

     }

     function deleteComment(commentToDelete:string){
        const commentsWithoutDeleteOne = comments.filter(comment=>{
            return comment !== commentToDelete
        })
      setComments(commentsWithoutDeleteOne)
     }

   
    // Renderiza o componente Post
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />  {/* Renderiza o Avatar do autor */}
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>  {/* Renderiza o nome do autor */}
                        <span>{post.author.role}</span>  {/* Renderiza a função/papel do autor */}
                    </div>
                </div>
                <time title={publishedDate} dateTime={post.publishAt.toISOString()}>
                    {publishedDateRelativeToNow}  {/* Renderiza a data de publicação relativa ao momento atual */}
                </time>
            </header>
            <div className={styles.content}>
                {/* Mapeia e renderiza o conteúdo do post */}
                {post.content.map(line => {
                    if (line.type === "paragraph") {
                        return (
                            <p key={line.content}>{line.content}</p>  
                        )
                    } else if (line.type === "link") {
                        return (
                            <p key={line.content}><a href="">{line.content}</a></p> 
                        )
                    }
                })}
            </div>
            <form onSubmit={handleCreateNewComent} className={styles.commentForm}>
                <strong>deixe seu feedback</strong>  {/* Rótulo do formulário de comentário */}
                <textarea
                 required 
                 onInvalid={handleNewCommentInvalid}
                 placeholder="deixe um comentário" name="comment" 
                 onChange={handleNewCommentChange}  
                 value={newCommentText}/>  
                 {/* Área de texto para o comentário */}
                <footer>
                    <button type="submit" 
                    disabled={isNewCommentEmpty}>
                        Publicar
                   </button>  {/* Botão de envio do comentário */}
                </footer>
            </form>
            <div className={styles.commetList}>
                {comments.map(comment=>{
                    return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
                })} {/* Renderiza o componente de lista de comentários */}
            </div>
        </article>
    );
}
