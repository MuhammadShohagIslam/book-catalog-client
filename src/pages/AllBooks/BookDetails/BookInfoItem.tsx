type BookInfoItemProp = {
    name: string;
    value: string | boolean;
};

const BookInfoItem = ({ name, value }: BookInfoItemProp) => {
    return (
        <li className="border-2 border-white px-4">
            <span className="px-3 w-[160px] text-gray-800 font-semibold inline-block h-full py-3 border-r-2 border-white">
                {name}
            </span>{" "}
            <span className="ml-3 text-gray-800 font-semibold">{value}</span>
        </li>
    );
};

export default BookInfoItem;
