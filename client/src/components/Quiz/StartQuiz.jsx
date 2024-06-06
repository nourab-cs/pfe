// import React from "react";
 
// import { Button } from "@nextui-org/button";
   
// function StartQuiz({ start }) {
//   return (
//     <div>
//       <Button 
//       onClick={start}>
//         Commencer le test 
//         </Button>
//     </div>
//   );
// }

// export default StartQuiz;

import React from "react";
import { Button } from "@nextui-org/button";

function StartQuiz({ start }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Bienvenue au Test de Compétence</h1>
        <p className="text-gray-700 mb-6">
          Ce test vous permettra de mesurer vos connaissances et compétences dans
          le domaine choisi. Prenez votre temps et répondez aux questions avec
          soin. Bonne chance!
        </p>
        <Button color="primary" onClick={start}>
          Commencer le test
        </Button>
      </div>
    </div>
  );
}

export default StartQuiz;
