import '../Style/menucontent.css'

const MenuContent = ({ children }) => {

    return (
        <div className='row content_custom'>
            <div className='col-1 void'></div>
            <div className='col-10 main_custom'>
                {children}
            </div>
            <div className='col-1 void'></div>
        </div>
    );

}

export default MenuContent;