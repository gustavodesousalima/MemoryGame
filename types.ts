export interface CardProps {
    id: string;
    concept: string;
    definition: string;
    flipped: boolean;
    markedForStudy: boolean;
    showConcept: boolean;
    onClick: (id: string) => void;
    content: string;
    onDoubleClick: (id: string) => void;
  }
  
  export interface GridProps {
    cards: { id: string; concept: string; definition: string }[];
    onCardClick: (id: string, isDoubleClick: boolean) => void;
    onDoubleClick: (id: string) => void;
  }
  