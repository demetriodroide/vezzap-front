
import Quagga from "quagga"
import DrawFinder from '../DrawFinder/DrawFinder'
import React, { Component } from 'react';

import { useRedirect } from '../../components/Hooks/useRedirect';
class Barcode extends Component {
  constructor() {
    super();
    this.state = {
      VideoRef: React.createRef(),
      Cervezas : []
    }
  }
  resultFinded = () => {
    return this.state.Cervezas
            .map((valor) => {
              console.log(valor)
             return <DrawFinder beer={valor} />
            });
  }
  render() {
    return (
      <div ref={this.state.VideoRef} className="imgBuffer" >
        {this.resultFinded()}
      </div>
    );
  }
componentDidMount() {
    
    this.q = Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: this.state.VideoRef.current// Or '#yourElement' (optional)
      },
      decoder: {
        readers: ["ean_reader"]
      }
    }, function (err) {
      if (err) {
        console.log(err);
        return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
      console.log("Started");
      let qP = Quagga.onProcessed((result) => {
       //var drawingCtx = Quagga.canvas.ctx.overlay
        // drawingCanvas = Quagga.canvas.dom.overlay;
if (result) {
          if (result.boxes) {
            //drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
            result.boxes.filter(function (box) {
              return box !== result.box;
            }).forEach(function (box) {
          //  Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
            });
          }
if (result.box) {
            // Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
          }
if (result.codeResult && result.codeResult.code) {
                let ean = 72783000010 //result.codeResult.code
               
                  fetch(`http://localhost:8080/ImgoingTohaveLuck/${ean}`)
                  .then(response =>response.json())
                  .then(Data =>{ console.log(Data);
                  const cervezas = Data.map(beer =>(
                         {
                          name: `${beer.name}`,
                          IDBEER: `${beer.name}`,
                          descr_full: `${beer.descr_full}`,
                          image : `${beer.image}`
                        }
                      ))
                    return cervezas})
                  .then(cervezas =>  this.setState({
                    Cervezas :[...cervezas] 
                }))
                  .catch(error=>console.log(error))
            
            console.log(result.codeResult);
            let img = document.querySelector(".App video");
            let canvas = document.querySelector(".App canvas");
            console.log(img, canvas);
            canvas.getContext("2d").drawImage(img, 0, 0);
           // Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
            Quagga.offProcessed(qP);
            Quagga.stop();
            
          }
        }
      });
    });
  }
}
export default Barcode;
