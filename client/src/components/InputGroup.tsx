import classNames from 'classnames'

interface InputGroupProps {
    className?:string
    type:string
    placeholder:string
    value:string 
    error : string | undefined 
    setValue : (str: string) => void
}


const InputGroup:React.FC<InputGroupProps> = ({
    className,
    type,
    placeholder,
    value,
    error,
    setValue

})=>{

    return <div className={className}>
    <input value={value} onChange={e=>setValue(e.target.value)}  type={type} className={classNames("w-full p-3 transition duration-200 bg-gray-100 border border-gray-300 rounded outline-none focus:bg-white hover:bg-white",{"border-red-500":error})} placeholder={placeholder}/>
    <small className="font-medium text-red-600">{error}</small>
  </div>
}

export default InputGroup