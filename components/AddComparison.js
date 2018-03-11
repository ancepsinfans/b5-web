export default ({ addComparison }) => (
  <form onSubmit={addComparison} className={'no-print'}>
    <input type='text' id='comparisonName' placeholder='Name for comparison' />
    <input type='text' id='comparisonData' placeholder='URL or id for comparison' />
    <br />
    <button type='submit'>Add</button>
    <style jsx>
      {`
        input {
          width: 80%;
          height: 40px;
          margin: 10px;
          font-size: 20px;
        }
        input:focus {
          outline:0;
        }
        input:active {
          outline: 0;
        }
        button {
          background-color: white;
          border-radius: 3px;
          color: black;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease 0s;
        }
        button:focus {
          outline:0;
        }
        button:active {
          outline: 0;
        }
        @media screen and (max-width: 700px) {
          button {
            width: 300px;
            margin-bottom: 5px;
        }
        @media print {    
          .no-print, .no-print * {
            display: none !important;
          }
        }
      `}
    </style>
  </form>
)
