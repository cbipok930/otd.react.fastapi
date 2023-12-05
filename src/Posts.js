import React, { useContext, useEffect } from "react";
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'

const textArray = ["Загрузка -", "Загрузка \\", "Загрузка |", "Загрузка /"]


class Posts extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {posts_num: props.value_func.value, posts: [], all_posts: undefined, textIdx: 0, show_posts: false,
             serv_url: `http://localhost:8000/posts/`};
        // this.get_posts_old();
        this.get_posts();
    }

    // handler_old(event, value){
    //     this.props.value_func(value);
    //     this.setState({posts_num: value}, () =>
    //     {
    //         if (this.state.all_posts == undefined)
    //             this.get_posts_old();
    //         else
    //             this.setState({posts: this.state.all_posts.slice(0, this.state.posts_num)});
    //     }) 
    // }
    
    handler(event, value){
        console.log("SLider new value: ", value);
        this.props.value_func(value);
        console.log(this.state.all_posts);
        this.setState({posts_num: value}, () =>
        {
            if (this.state.all_posts == undefined){
                this.setState({serv_url: `http://localhost:8000/posts/`}, ()=> this.get_posts())
            }
            else
                this.setState({posts: this.state.all_posts.slice(0, this.state.posts_num)});
        })
    }
    process_object(obj){
        return <div>
            <li class="PostTitle">{obj.title}</li>
            <p class="PostBody">{obj.body}</p>
        </div>
    }
    render_posts(){
        if (this.state.show_posts)
            return this.state.posts
        else return <p>{textArray[this.state.textIdx]}</p>
    }
    // get_posts_old(){
    //     this.interval = setInterval(() => {
    //         this.setState({ show_posts: false, textIdx: (this.state.textIdx + 1) % textArray.length});
    //     }, 200)

    //     const url = 'https://jsonplaceholder.typicode.com/posts'
    //     fetch(url)
    //     .then((response) => response.json())
    //     .then((json) => {
    //             this.setState({all_posts: Object.values(json).map(obj => this.process_object(obj))}, ()=>{
    //                 clearInterval(this.interval);
    //                 console.log("all posts", this.state.all_posts);
    //                 this.setState({posts: this.state.all_posts.slice(0, this.state.posts_num)});
    //                 this.setState({show_posts: true});
    //             });})
    //     .catch(err => {
    //         this.setState({posts: <p>Не удалось загрузить посты</p>});
    //         alert(err);})
    //     console.log("POSTS: ", this.state['posts']);
    // }
    get_posts(){
        this.interval = setInterval(() => {
            this.setState({ show_posts: false, textIdx: (this.state.textIdx + 1) % textArray.length});
        }, 200)
        console.log("URL: ", this.state.serv_url);
        fetch(this.state.serv_url)
        .then((response) => response.text())
        .then((text_) => JSON.parse(text_))
        .then((json) => {
            this.setState({all_posts: JSON.parse(json).map(obj => this.process_object(obj))}, () => {
                this.setState({posts: this.state.all_posts.slice(0, this.state.posts_num)});
                console.log("json ", JSON.parse(json));
            });
        })
        .catch(err => {
            this.setState({posts: <p>Не удалось загрузить посты</p>});
            alert(err);})
        .finally(() => {
            clearInterval(this.interval);
            this.setState({show_posts: true});

        })
        console.log("POSTS from ", this.state.serv_url, " : ", this.state['posts']);
    }
    render() {
        return <div className="body">
            <h2>Посты</h2>
            <p>Количество: {this.state['posts_num']}</p>
            <Box sx={{ width: 620 }}>
            <Slider min={0} max={100} defaultValue={this.state.posts_num} aria-label="Default" valueLabelDisplay="auto" onChange={(event, value) => this.handler(event, value)}/>
            </Box>
            <div>{this.render_posts()}
            </div>
        </div>;
    }
}

export default Posts;