import React from "react";
 
import { Button } from "@nextui-org/button";
   
function StartQuiz({ start }) {
  return (
    <div>
      <Button 
      onClick={start}>
        Commencer le test 
        </Button>
    </div>
  );
}

export default StartQuiz;
