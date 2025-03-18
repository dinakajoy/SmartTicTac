type TSquare = {
  value: string | null;
  squareClicked: () => void;
  id: string;
};

const Square = ({ value, squareClicked, id }: TSquare) => (
  <button
    id={id}
    onClick={squareClicked}
    className="square w-20 h-20 flex items-center justify-center text-4xl font-bold bg-gray-600 rounded-lg cursor-pointer hover:bg-gray-500 transition text-gray-300"
  >
    {value}
  </button>
);

export default Square;
