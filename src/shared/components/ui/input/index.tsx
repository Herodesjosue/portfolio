
const Input = () => {
  return (
    <div className="w-96 bg-white rounded-[1.5625rem] h-14 flex items-center">
      <input
        type="text"
        className="w-full h-full rounded-full pl-8 outline-0 placeholder:text-primary-600"
        placeholder="Your institutional email"
      />

      <span className="icon-telegram pr-8 text-xl" />
    </div>
  );
};

export default Input;
