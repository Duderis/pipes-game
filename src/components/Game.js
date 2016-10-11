import React, {Component} from 'react';
import { StyleSheet,Image,Text,View,Linking,TouchableHighlight,AlertIOS,Dimensions } from 'react-native';

import CustomScreen from './Screen';
import Pipe from '../classes/Pipe';
import PipeNode from './PipeNode';
import { generateGrid, loadImages } from '../functions/functions';


class Game extends Component {
    constructor(props){
        super(props);
        this.drawGrid = this.drawGrid.bind(this);
        this.generate = this.generate.bind(this);
        this.interval;
        this.images = loadImages();
    }

    componentWillMount(){
        if(this.props.pipes.length===0)
            this.generate();
    }
    componentDidMount(){
        this.interval = setInterval(()=>{
            //this.props.spread();
        },5000);
    }
    componentWillUnmount(){
        if(this.interval){
            clearInterval(this.interval);
        }
    }
    drawGrid(size, dimensions){
        //let size = 5;
        let siz;
        if(dimensions.height>dimensions.width){
            siz = dimensions.width/size;
        } else {
            siz = dimensions.height/size;
        }
        let array2d = [];
        for(x = 0; x < size; x++){
            var innerArray = [];
            for(y = 0; y < size; y++){
                innerArray.push(
                    <View key={y+'xy'+x}>
                        <PipeNode
                            pipe={this.props.pipes[x][y]}
                            rotate={this.props.rotateNode}
                            images={this.images}
                            siz={siz}
                            />
                    </View>
                );
            }
            array2d.push(
                <View key={x} style={styles.container}>
                    {innerArray}
                </View>
            );
        }
        return array2d;
    }
    generate(){
        this.props.createGrid(generateGrid(this.props.size,this.props.startPipe,this.props.endPipe));
    }
    render() {
        let dim = Dimensions.get('window');
        let localGrid = [];// = this.drawGrid(5,5);
        if(this.props.pipes.length!=0){
            let size = this.props.pipes.length;
            localGrid = this.drawGrid(size,dim);
        }

        var { navigator } = this.props;
        let styl = {};
        if(dim.height>dim.width){
            //styl= {marginTop:(dim.height-dim.width)/2};
        } else {
            //styl= {marginLeft:(dim.width-dim.height)/2,width:dim.height};
        }
        return (
            <View style={styles.page}>
                <View style={styles.buttons}>
                    <TouchableHighlight onPress={this.generate} style={[{flex:1},styles.button]}><Text style={styles.text}>Regenerate</Text></TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.navigator.pop()}style={[{flex:1},styles.button]}><Text style={styles.text}>Back to Menu</Text></TouchableHighlight>
                </View>
                <View style={[styl,styles.gridBox]}>
                    {localGrid}
                </View>
                <View><Text style={styles.text}>{this.props.score}</Text></View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    buttons: {
        height: 100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        borderRadius: 25,
        height: 50,
        width: 100,
        margin: 10
    },
    page: {
        flexDirection: 'column'
    },
    gridBox:{
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: 'black',
        backgroundColor: '#fff'
    }

});

export default Game;
