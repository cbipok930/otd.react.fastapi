import React from "react";
import axios from "axios";
class IntroPanel extends React.Component{
    constructor(props){
        super(props);
        this.state = {selectedFile: null, result_file: null};
        // this.get_content();
    }
    process_object(obj){
        // console.log("obj ", obj);
        return <div>
            <li class="PostTitle">{Object.keys(obj)[0]}</li>
            <p class="PostBody">{Object.values(obj)[0]}</p>
        </div>
    }
    // get_content(){
    //     let url_serv = 'http://localhost:8000';
    //     fetch(url_serv)
    //     .then((response) => response.text())
    //     .then((html) => {
    //         var parser = new DOMParser();
    //         var doc = parser.parseFromString(html, 'text/html');
    //         var qq = doc.querySelector('body').textContent
    //         console.log([JSON.parse(qq)]);
    //         return [JSON.parse(qq)];
    //     })
    //     .then((json) => {
    //             var res = Object.values(json).map(obj => this.process_object(obj));
    //             console.log("res ", res);
    //             this.setState({cont: res});
    //             // console.log("state: ", this.state.cont);
    //         })
    //     .catch(err => {
    //         this.setState({cont: <p>Meh</p>});
    //         alert(err);})
    // }

    drawFile(){
        console.log("drawing file:", this.state.result_file);
        if (this.state.result_file != null)
            return (<img src={URL.createObjectURL(this.state.result_file)}/>);
    }

    onFileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
        });
    };

    onFileUpload = () => {
        // Create an object of formData
        var formData = new FormData();
 
        // Update the formData object
        try{
            console.log(this.state.selectedFile.type);
            formData.append(
                "file",
                this.state.selectedFile,
            );
            console.log("File:",  this.state.selectedFile);
                axios.post("http://localhost:8000/files/", formData, { responseType: 'blob' })
                .then(res => {
                    console.log("post response", res);
                    return res;
                })
                .then(res => {
                    if (res == 'er')
                        throw "Wrong file format!";
                    return res.data;
                })
                .then(res => {
                    console.log("before drawing: ", typeof(res));
                    this.setState({result_file: res}, () => this.drawFile())
                })
                .catch(err => alert(err))
        }
        catch{
            alert("No file!");
        }
    };
    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <p>
                        File Name:{" "}
                        {this.state.selectedFile.name}
                    </p>
                    <p>
                        File Type:{" "}
                        {this.state.selectedFile.type}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <p>
                        Choose before Pressing the Upload
                        button
                    </p>
                </div>
            );
        }
    };
    render() {
        return <div className="body">
        <h1>
            Глубокий анализ опенингов Наруто
        </h1>
        <h2>
            Введение
        </h2>
        <p>Существует множество подходов к оценке опенингов "Наруто",
            от тщательного анализа музыкальной составляющей до оценки визуальной стилистики и ее соответствия общей
            атмосфере сериала.</p>
        <p>Однако эта работа предлагает совершенно новый, уникальный в своем роде подход.</p>
        <p>Данная исследовательская работа учитывает только те опенинги, которые открывают каноничные серии,
            т.е серии, чьи события сопоставляются с оригинальной мангой Наруто.</p>
        <picture>
            <img src="de42fc7c0fcd900d45d5d9f445a49dbf.jpg" alt="cool Minato image"/>
        </picture>
        <br></br>
        <input id="image-file-upload" type="file" onChange={this.onFileChange}/>
        <div>{this.fileData()}</div>
        <button onClick={this.onFileUpload}>
                        Upload!</button>
        <div>
            {this.drawFile()}
        </div>
        </div>;
    }
}
        {/* <div>{this.state["cont"]}</div> */}
export default IntroPanel;