import {useState, useEffect, forwardRef, Children} from 'react'
import { Container, Row, Col, Tab, DropdownButton, Dropdown} from 'react-bootstrap'
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button'

import Avatar from "@mui/material/Avatar";
import Stack from '@mui/material/Stack'

import { green, red } from "@mui/material/colors";
import Tabs from 'react-bootstrap/Tabs'
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const app_name = 'reci-pin';
function buildPath(route)
{
  if (process.env.NODE_ENV === 'production')
      return 'https://' + app_name + '.herokuapp.com/' + route;
  else
      return 'http://localhost:5000/' + route;
}

function ReadMore(props) {

  let picture = props.recipe.pic

  const [commentText, setCommentText] = useState('')
  const [commentArray, setCommentArray] = useState([]);   

  if (picture == null || picture == "")
    picture = "https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-260nw-1350441335.jpg"


    const getComments = async () =>
    {
        let jsonPayLoad = JSON.stringify({
            recipeID: props.recipe._id,
        });
  
        try 
        {
            // returns liked, favorited
            const response = await fetch(buildPath("api/getComments"), {
                method: "POST",
                body: jsonPayLoad,
                headers: { "Content-Type": "application/json","x-access-token": JSON.parse(window.localStorage.getItem('userObject'))['token'] }
              });
  
            let res = JSON.parse(await response.text());

            // fuck react
            await new Promise(resolve => setTimeout(resolve,1000));

            setCommentArray(res);
            console.log(res);
  
        }

        catch(e)
        {
            console.log(e)
        }
    };

    useEffect(() => {getComments();}, []);

    const submitComment = async () =>
    {       
        let x = commentText.slice()

        let jsonPayLoad = JSON.stringify({
            recipeID: props.recipe._id,
            userID: JSON.parse(window.localStorage.getItem('userObject'))['_id'],
            commentText: commentText
        });


        setCommentText('')

        console.log(jsonPayLoad);

        try {
            // Do not await fetches anymore
            const response = await fetch(buildPath("api/addComment"), {
              method: "POST",
              body: jsonPayLoad,
              headers: {
                "Content-Type": "application/json",
                "x-access-token": JSON.parse(
                  window.localStorage.getItem("userObject")
                )["token"],
              },
            });
      
            let res = JSON.parse(await response.text());

            let y = {
                username: JSON.parse(window.localStorage.getItem('userObject'))['username'],
                comment: commentText,
                pic : JSON.parse(window.localStorage.getItem('userObject'))['profilePic']
            }
      

            setCommentArray(prevItems => {return [...prevItems, y]})
            
            
  
        } 
        catch (e) 
        {
            console.log(e);
        }

    }

    const cancelComment = async () =>
    {
        setCommentText('')
    }

    function createCommentDiv(comment)
    {
        let pfp = comment.pic;

        if (pfp == null || pfp == "")
            pfp = "https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-260nw-1350441335.jpg";

        return (
            <Card style = {{ padding: '10px', margin: "10px 0 10px 0"}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
                            <img src= {pfp}/>
                        </Avatar>
                        }
                    style = {{ padding: '0px'}}
                    title= {comment.username}
                />
                <CardContent style = {{marginLeft: '7.2%', padding: '0%'}}>
                    <div style = {{whiteSpace : "pre-wrap"}}>
                    {comment.comment}
        
                    </div>
                </CardContent>
            </Card>
        );
        
    }

  return (
    <Container>
      <Row>
        <CardMedia component="img" height="294" image={picture} alt="food" />
      </Row>

      <br></br>
      <Row>
        <Tabs
          defaultActiveKey="ingredients"
          id="uncontrolled-tab-example"
          className="mb-3"
          tabClassName="text-black"
        >
          <Tab
            eventKey="ingredients"
            title="Ingredients"
            tabClassName="text-black"
            
          >
              <div style = {{marginLeft: "2%", whiteSpace: "pre-wrap"}}>

                {props.recipe.ingredients}
              </div>
          </Tab>
          <Tab
            eventKey="directions"
            title="Directions"
            tabClassName="text-black"
          >
              <div style = {{marginLeft: "2%", whiteSpace: "pre-wrap"}}>

                {props.recipe.instructions}
              </div>
          </Tab>
          <Tab
            eventKey="Country Stuff"
            title="Comments"
            tabClassName="text-black"
          >
            <Row>
                <Col sm = {10}>
                <EditTextarea 
                    className='input-group-prepend'
                    placeholder = "Add a comment..."
                    value = {commentText}
                    onChange={setCommentText}/>
                </Col>

                <Col style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Stack>

                        <Button variant = "contained" style = {{backgroundColor:"black", marginBottom: '5%'}} onClick={submitComment}> Post </Button>
                        <Button variant = "outlined" style = {{borderColor:"black", color: "black"}} onClick={cancelComment}> Cancel </Button>
                        </Stack>
                 


                </Col>
            </Row>

            <Dropdown style = {{padding: '0px', marginBottom: '1.5px', marginTop: '20px', fontSize: '14px', marginLeft: '-10px', color: 'red'}}>
            <Dropdown.Toggle style ={{color: 'red'}} as={CustomToggle} id="dropdown-custom-components">
                Sort by: Oldest
            </Dropdown.Toggle>
        
            <Dropdown.Menu as={CustomMenu}>
                <Dropdown.Item eventKey="1" active>Oldest</Dropdown.Item>
                <Dropdown.Item eventKey="2">Newest</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            <hr style = {{padding: '0px', marginTop: '-3px', width: '100%',marginLeft: '-10px'}}/>
            <Row>
                {commentArray.map(createCommentDiv)}
            </Row>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      style = {{color: 'grey', textDecoration: 'none'}}
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {" "} 
      {children}
      &#x25bc;
    </a>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

  

export default ReadMore;