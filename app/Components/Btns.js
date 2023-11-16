
export function Btn(props) {
    return (
        <button {...props} 
        disabled={props.Disabled}
        className={
            " px-2 py-1 flex gap-2 text-opacity-90 rounded-md "
            +(props.Primary ? " bg-blue-600 text-white " : " text-gray-700")
            +(props.Disabled ? " bg-opacity-70 text-opacity-70 cursor-not-allowed " : " ")
    } 
        />
    )
}

