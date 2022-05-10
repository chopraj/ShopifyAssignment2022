import styled from 'styled-components'
import { Fragment, useState, useEffect } from 'react'

function App() {
  const key = process.env.REACT_APP_API_KEY

 const [Prompt, setPrompt] = useState('')

 const [promptList, setPromptList] = useState([{
   prompt: '',
   reponse: ''
 }])

  const onSubmit = async e => {
    e.preventDefault()
      console.log(Prompt)
      const data = {
        prompt: Prompt,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
       };

       const Response = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", 
       {method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
       },
       body: JSON.stringify(data),
      }).then(response => response.json()).then(data => {
        return data['choices'][0]['text']
      })
      
    
    console.log('response', Response)
    promptList.push({
      prompt: Prompt, 
      response: Response
    })
    setPromptList(promptList)
    setPrompt('')
    console.log(promptList)

  }
  
  function showResults(element,idx) {
    if (element['prompt'] !== '') {
    return (
    // <li key={idx}>prompt:{element['prompt']},response:{element['response']}</li>
    <ResultDiv key={idx}>
      <PromptDiv> <span>Prompt:</span> {element['prompt']}</PromptDiv>
      <ResponseDiv><span>Response:</span> {element['response']}</ResponseDiv>
    </ResultDiv>
     )
    }
  }

  return (
    <Background>
    <AppContainer>
      <Title>
        Fun with AI <span>(by Raj Chopra)</span>
      </Title>
      <form onSubmit={e => onSubmit(e)}>
        <FormDiv>
            <Lead>
              Enter your prompt below to get started!
            </Lead>
            <PromptArea name="prompt" onChange={(e) => setPrompt(e.target.value)} placeholder='Prompt goes here' ></PromptArea>
            <SubmitButton type='submit'>Submit</SubmitButton>
        </FormDiv>
      </form>
      <HistoryDiv>
        {promptList?.length? promptList.map((e,idx) => showResults(e,idx)):<></>}
      </HistoryDiv>

    </AppContainer>
    </Background>
  );
}

export default App;

const Background = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
background-image: linear-gradient(to right,#614385 ,#516395);
`
const AppContainer = styled.div`
padding-top: 3rem;
padding-bottom: 1rem;
background-color: rgba(200,200,200,.38);
width: 40%;
height: 85%;
border-radius: 40px;
overflow: auto;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Title = styled.div`
font-size: 3rem;
width: 100%;
text-align: center;
>span{
  font-size: 1.2rem;
}
`

const Lead = styled.div`
width: 100%;
font-size: 1.5rem;
text-align: center;
`
const FormDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const PromptArea = styled.textarea`
width: 80%;
padding: .4rem;
border: 1px solid #ccc;
margin: 1rem;
`

const SubmitButton = styled.button`
  cursor: pointer;
  font-size: 19px;
  border-radius: 5px;
  margin: 1rem;
  color: black;
  background-color: transparent;
  border-color: #734b6d;
  font-family: 'Poppins', sans-serif;
  width: 150px;
  box-shadow: 2px 4px #141313;
  outline: none;

 :hover {
  background-color: #734b6d;
  transition: 0.2xs;
  border-color: #734b6d;
  color: white;
 }
  :active {
  transform: translateY(3px);
  transition: 0.1s;
  background-color: #734b6d;
}
`

const HistoryDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: black;
width: 90%;
`

const ResultDiv = styled.div`
display: flex;
flex-direction: column;
background-color: #DEDEDE;
border-radius: 10px;
padding: .5rem;
margin: 1rem;
`

const PromptDiv = styled.div`
>span{
  font-weight: 700;
}
`
const ResponseDiv = styled.div`
>span{
  font-weight: 700;
}
`
