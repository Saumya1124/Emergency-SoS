function GetChat(props) {
  
    const text = props.text;
    const userId = props.userId;
    const photoURL = props.userDp;
    const user = props.user;
    
    console.log(photoURL)

    const messageClass = userId === user.userId ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} style={{width:'30px', height:'30px'}}/>
        <p>{text}</p>
      </div>
    </>)
  }

  
export default GetChat