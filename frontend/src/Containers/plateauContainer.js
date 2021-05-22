import {useState, useEffect} from 'react';

const PlateauContainer = () => {

    const [file, setFile] = useState();
    const [gridTemplateColumns, setGridTemplateColumns] = useState(false);
    const [gridTemplateRows, setGridTemplateRows] = useState(false)
    const [col, setCol] = useState(0);
    const [row, setRow] = useState(0);
    const [item, setItem] = useState() 

    const handleChangeConfigMode = (e) => {
        setFile(e.target.value)
    }

    const handleSubmitInputText = (e) => {
        e.preventDefault();

        let input = e.target.inputText.value;

        let inputArray = input.split("\n");
        let plateauSize = inputArray[0].split(" ")

        setGridTemplateColumns("1fr ".repeat(plateauSize[0]))
        setGridTemplateRows("1fr ".repeat(plateauSize[1]))

        setCol(plateauSize[0]);
        setRow(plateauSize[1])

    }
    

    useEffect(() => {
        console.log(('psst'))
        let items = [];
        for (let i = 0; i < col; ++i) {
            for (let n = 0; n < row; ++n) {
                let key = 0;
                key++
                items.push(<div className="item" key={key}></div>)
            }
        }
        setItem(items)
    }, [col, row])
    

    return(
        <div className="plateau_container">
            <div className="plateau" style={{gridTemplateColumns: gridTemplateColumns ? gridTemplateColumns : '0', gridTemplateRows: gridTemplateRows ? gridTemplateRows : '0'}}>
                {item}
            </div>
            <aside>
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Configure ton plateau ainsi que tes rovers</label>
                <select className="form-select mb-3" aria-label="Default select example" id="exampleFormControlTextarea1" onChange={handleChangeConfigMode}>
                    <option selected>Sélectionner un mode de gestion</option>
                    <option value="1">J'ai un fichier de configuration</option>
                    <option value="0">Je n'ai pas de fichier de configuration</option>
                </select>
                {file === "0" && <form className="mb-3" onSubmit={handleSubmitInputText}>
                    <textarea className="form-control" name="inputText" placeholder="Défini la taille du plateau, Place ta rover, Déplace ta rover" rows="3"></textarea>
                    <button type="submit" className="btn btn-primary">Go !</button>
                </form>}
                {file === "1" && <form className="input-group mb-3">
                    <input type="file" className="form-control" id="inputGroupFile02" />
                    <button type="submit" className="btn btn-primary">Go !</button>
                </form>}
            </aside>
        </div>
    )
}

export default PlateauContainer;