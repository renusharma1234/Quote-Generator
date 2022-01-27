const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading()
{
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function complete()
{
    if(!loader.hidden)
    {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote()
{
    loading();
    
    const apiUrl ='https://quotable.io/random';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        // if Author is blank 
        if(data.author === '')
        {
            authorText.innerText='Unknown';
        }
        else
        {
            authorText.innerText=data.author;
        }
        //Reduce font size for long quotes
        if(data.content.length > 50)
        {
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.content;
        //stop loader
        complete();
    }
    catch(error){
        //getQuote();
    }
}

//Tweet Quote
function tweetQuote()
{
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
   // console.log(twitterUrl);
    window.open(twitterUrl,'_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);
//On Load
getQuote();


