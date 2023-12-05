import React from "react";
class ConclusionPanel extends React.Component{
    render() {
        return <div className="body">
            <h2>Результаты исследования</h2>
        <p>Мною было оценено более 25 опенингов(26). Ниже представлены опенинги с наивысшими оценками.</p>
        <table>
            <th colspan="8">Топ 5</th>
            <tr>
                <td>Название</td>
                <td>v1</td>
                <td>v2</td>
                <td>v3</td>
                <td>m1</td>
                <td>m2</td>
                <td>m3</td>
                <td>A</td>
            </tr>
            <tr>
                <td>Silhouette</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>10</td>
                <td>9</td>
                <td>10</td>
                <td>9.83</td>
            </tr>
            <tr>
                <td>Sign</td>
                <td>10</td>
                <td>10</td>
                <td>9</td>
                <td>10</td>
                <td>9</td>
                <td>9</td>
                <td>9.55</td>
            </tr>
            <tr>
                <td>Lovers</td>
                <td>9</td>
                <td>8</td>
                <td>9</td>
                <td>8</td>
                <td>9</td>
                <td>8</td>
                <td>8.39</td>
            </tr>
            <tr>
                <td>GO!!!</td>
                <td>7</td>
                <td>7</td>
                <td>10</td>
                <td>9</td>
                <td>7</td>
                <td>7</td>
                <td>8.03</td>
            </tr>
            <tr>
                <td>Kaze</td>
                <td>8</td>
                <td>8</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>6</td>
                <td>7.09</td>
            </tr>
        </table>
        <img src="photo_5382298332556283021_x.jpg"/>
        </div>;
    }
}

export default ConclusionPanel;