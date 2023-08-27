const Header = () => {
    return (
        <div className="w-full h-[80px] pt-4 pl-10 flex items-center justify-center">
           <div className="w-[200px] h-[70px]" style={{
                        backgroundImage: "url('/assets/logo.png')",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain"
        
                    }}>

           </div>
        </div>
    );
}

export default Header;