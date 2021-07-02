const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const loader= document.getElementById('loader');

let apiQuotes = []

//Show loading
function loading() {
  loader.hidden =false;
  quoteContainer.hidden = true;
}
//hide loading
function loadComplete() {
  loader.hidden =true;
  quoteContainer.hidden=false;
}


//show new quote
function newQuote() {
  loading()
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //check author blank
  if (!quote.author) {
    authorText.textContent= 'Unknown';
  }else{authorText.textContent= quote.author;}
 if (quote.text.length > 50) {
   quoteText.classList.add('long-quote');
 }else{quoteText.classList.remove('long-quote');
}
//Set quote and hide loader
quoteText.textContent=quote.text;
loadComplete();
 

}

//Get Quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    let response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    
  } catch (error) {}
}

//Tweet quote
function tweetQuote(params) {
  const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl,'_blank');
}

//Event Listener
 newQuoteBtn.addEventListener('click',newQuote);
 twitterBtn.addEventListener('click',tweetQuote);


//On load

getQuotes();
