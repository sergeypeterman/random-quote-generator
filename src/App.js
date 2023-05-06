import React from 'react';

class Box extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      quote: '',
      quote2: '',
      response: {},
      loaded: false,
      tweetLink: ''
    }
    this.fetchJoke = this.fetchJoke.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  fetchJoke() {
    fetch("https://v2.jokeapi.dev/joke/Any")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data); 
        let link = '';
        
        if(data.type === "single"){
          link = 'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
      encodeURIComponent(data.joke);
          this.setState({
            quote: data.joke,
            quote2: '',
            response: {...data},
            loaded: true,
            tweetLink: link
          });
          console.log(link); 
        }
        else if(data.type === "twopart"){
          link = 'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
      encodeURIComponent('"' + data.setup + '" ' + data.delivery);
          this.setState({
            quote: data.setup,
            quote2: data.delivery.toUpperCase(),
            response: {...data},
            loaded: true,
            tweetLink: link
          });
          
          console.log(this.state.tweetLink); 
        }
        else{
          console.log('unknown type');
          this.setState({
            quote: 'unknown type',
            quote2: 'unknown type',
            response: {},
            loaded: true
          });
        }
      }
      );
  }
  componentDidMount(){
    this.fetchJoke();
  }
  handleClick(){
    this.fetchJoke();
  }
  render(){
    let hue = 34, sat=50, light=50;
    
    hue = Math.floor(Math.random()*255);
    sat = Math.floor(Math.random()*50)+20;
    light = Math.floor(Math.random()*50)+20;
    
    document.documentElement.style.setProperty('--color-main', `hsl(${hue},${sat}%,${light}%)`);
    document.documentElement.style.setProperty('--color-hover', `hsl(${hue},${sat}%,${light+10}%)`);
    
    console.log(`hsl(${hue},${sat}%,${light}%)`);
    
    return (
      <div id="quote-box">
        <div id="text">{this.state.quote}</div>
        <div id="punch">{this.state.quote2}</div>
        <div id="buttons">
          <a id="tweet-quote" href={this.state.tweetLink}><i class="fa fa-twitter"></i></a>
          <button id="new-quote" onClick = {this.handleClick}>New Joke</button>
        </div>
     </div>
    );
  }
}

export default Box;
