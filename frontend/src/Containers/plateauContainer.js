import {useState} from 'react';
import marsRover from '../img/mars-rover.svg';

const PlateauContainer = () => {

    const [file, setFile] = useState();
    const [gridTemplateColumns, setGridTemplateColumns] = useState(false);
    const [gridTemplateRows, setGridTemplateRows] = useState(false)
    const [col, setCol] = useState(0);
    const [row, setRow] = useState(0);
    const [newPosition, setNewPosition] = useState([]);
    const [plateau, setPlateau] = useState();
    const [roversInfo, setRoversInfo] = useState();

    const handleChangeConfigMode = (e) => {
        setFile(e.target.value)
    }

    const handleChangeTextFile = (event) => {

        var input = event.target;

        var reader = new FileReader();
        reader.onload = function(){
            var text = reader.result.replace(/\r/g, "\n");

            handleSubmitInputText(text, true)
        };
        reader.readAsBinaryString(input.files[0]);
            
    }

    const handleSubmitInputText = (e, file = false) => {
        if (!file) {
            e.preventDefault()
        }
        

        let input = file ? e : e.target.inputText.value;
        let inputArray = input.split("\n");
        let plateauSize = inputArray.shift().split(" ");

        setGridTemplateColumns("1fr ".repeat(parseInt(plateauSize[0], 10)+1))
        setGridTemplateRows("1fr ".repeat(parseInt(plateauSize[1], 10) + 1))

        setCol(plateauSize[0]);
        setRow(plateauSize[1])

        makePlateau(plateauSize[0], plateauSize[1])
        .then((plateau) => {
            setPlateau(plateau)

            // On transforme les entrées en différents arrays contenant chacun les info d'une rovers
            let rovers = chunkArray(inputArray, 2).filter( roverTab => roverTab.length == 2);
            setRoversInfo(rovers)

            let position = rovers.map( (rover, i) => {
                let position = rover[0];
                let move = rover[1];

                let positionArray = position.split(' ');

                let positionSpaceLess = position.split(" ").join("");

                let classNameItem = positionSpaceLess.split(/[A-Za-z]/);

                let element = document.getElementsByClassName(classNameItem[0])[0];

                const image = document.createElement('img');
                image.src  = marsRover

                let newElement = element ? element.appendChild(image) : null;


                // On récupère la direction de la rover pour afficher la border apropriée
                switch (positionSpaceLess.slice(-1)) {
                    case 'N' : 
                        image.className = 'border_north';
                        break;
                    case 'S' : 
                        image.className = 'border_south';
                        break;
                    case 'E' : 
                        image.className = 'border_east';
                        break;
                    case 'W' : 
                        image.className = 'border_west';
                        break;
                }
                image.classList.add(`rover${i}`)

                // Move
                let arrayMove = move.split('');

                arrayMove.map((letter) => {
                    switch (letter) {
                        case 'L' : 
                            switch (positionArray[2]) {
                                case 'N' : 
                                    positionArray[2] = 'W';
                                    break;
                                case 'S' : 
                                    positionArray[2] = 'E';
                                    break;
                                case 'E' : 
                                    positionArray[2] = 'N';
                                    break;
                                case 'W' : 
                                    positionArray[2] = 'S';
                                    break;
                            }
                            break;
                        case 'R' : 
                            switch (positionArray[2]) {
                                case 'N' : 
                                    positionArray[2] = 'E';
                                    break;
                                case 'S' : 
                                    positionArray[2] = 'W';
                                    break;
                                case 'E' : 
                                    positionArray[2] = 'S';
                                    break;
                                case 'W' : 
                                    positionArray[2] = 'N';
                                    break;
                            }
                            break;
                        case 'M' : 
                            switch (positionArray[2]) {
                                case 'N' : 
                                    positionArray[1]++;
                                    break;
                                case 'S' : 
                                    positionArray[1]--;
                                    break;
                                case 'E' : 
                                    positionArray[0]++;
                                    break;
                                case 'W' : 
                                    positionArray[0]--;
                                    break;
                            }
                            break;
                    }
                })

                return positionArray
            })
            setNewPosition(position)
        })

        chunkArray(inputArray, 2).map((rover, i) => {
            setTimeout(() => {
                roverChangeDirection(rover, i)
              }, 10000*i);
        })
    }

    const roverChangeDirection = (rover, i) => {
        let positionArray = rover[0].split(' ');
        let img = document.getElementsByClassName(`rover${i}`)[0]

        // Move
        let arrayMove = rover[1].split('');
        arrayMove.map((letter, i) => {
            setTimeout(() => {
                switch (letter) {
                    case 'L' : 
                        switch (positionArray[2]) {
                            case 'N' : 
                                positionArray[2] = 'W';
                                img.classList.remove('border_north');
                                img.classList.add('border_west');
                                break;
                            case 'S' : 
                                positionArray[2] = 'E';
                                img.classList.remove('border_south');
                                img.classList.add('border_east');
                                break;
                            case 'E' : 
                                positionArray[2] = 'N';
                                img.classList.remove('border_east');
                                img.classList.add('border_north');
                                break;
                            case 'W' : 
                                positionArray[2] = 'S';
                                img.classList.remove('border_west');
                                img.classList.add('border_south');
                                break;
                        }
                        break;
                    case 'R' : 
                        switch (positionArray[2]) {
                            case 'N' : 
                                positionArray[2] = 'E';
                                img.classList.remove('border_north');
                                img.classList.add('border_east');
                                break;
                            case 'S' : 
                                positionArray[2] = 'W';
                                img.classList.remove('border_south');
                                img.classList.add('border_west');
                                break;
                            case 'E' : 
                                positionArray[2] = 'S';
                                img.classList.remove('border_east');
                                img.classList.add('border_south');
                                break;
                            case 'W' : 
                                positionArray[2] = 'N';
                                img.classList.remove('border_west');
                                img.classList.add('border_north');
                                break;
                        }
                        break;
                    case 'M' : 
                        switch (positionArray[2]) {
                            case 'N' : 
                                positionArray[1]++;
                                let destinationN = positionArray.slice(0,2).join("")
                                let newContainerN = document.getElementsByClassName(destinationN)[0]
                                newContainerN.appendChild(img);
                                break;
                            case 'S' : 
                                positionArray[1]--;
                                let destinationS = positionArray.slice(0,2).join("")
                                let newContainerS = document.getElementsByClassName(destinationS)[0]
                                newContainerS.appendChild(img);
                                break;
                            case 'E' : 
                                positionArray[0]++;
                                let destinationE = positionArray.slice(0,2).join("")
                                let newContainerE = document.getElementsByClassName(destinationE)[0]
                                newContainerE.appendChild(img);
                                break;
                            case 'W' : 
                                positionArray[0]--;
                                let destinationW = positionArray.slice(0,2).join("")
                                let newContainerW = document.getElementsByClassName(destinationW)[0]
                                newContainerW.appendChild(img);
                                break;
                        }
                        break;
                }
            }, 800*i)
        })
    }

    const chunkArray = (myArray, chunk_size) => {
        let index = 0;
        let arrayLength = myArray.length;
        let tempArray = [];
        
        for (index = 0; index < arrayLength; index += chunk_size) {
            let myChunk = myArray.slice(index, index+chunk_size);
            
            tempArray.push(myChunk);
        }
    
        return tempArray;
    }
    
    const makePlateau = async (col, row) => {
        let items = [];
        let y = row;

        let colForTab = parseInt(col, 10) + 1;
        let rowForTab = parseInt(row, 10) +1
        // console.log(parseInt(col, 10) +1)
        for (let i = 0; i < rowForTab; ++i) {
            let x = 0;
            
            for (let n = 0; n < colForTab; ++n) {
                items.push (<div className={`item ${x}${y}`}>{x} {y}</div>)
                x++
            }
            y--
        }
        return items
    }

    return(
        <div className="plateau_container">
            <div className="plateau" style={{gridTemplateColumns: gridTemplateColumns ? gridTemplateColumns : '0', gridTemplateRows: gridTemplateRows ? gridTemplateRows : '0'}}>
                {plateau && plateau}
            </div>
            <aside>
                <label htmlFor="exampleFormControlTextarea1" className="form-label">Configure ton plateau ainsi que tes rovers</label>
                <select className="form-select mb-3" aria-label="Default select example" id="exampleFormControlTextarea1" onChange={handleChangeConfigMode}>
                    <option>Sélectionner un mode de gestion</option>
                    <option value="1">J'ai un fichier de configuration</option>
                    <option value="0">Je n'ai pas de fichier de configuration</option>
                </select>
                {file === "0" && <form className="mb-3" onSubmit={handleSubmitInputText}>
                    <textarea className="form-control mb-3" id="inputText" name="inputText" placeholder="Défini la taille du plateau, Place ta rover, Déplace ta rover" rows="3"></textarea>
                    <button type="submit" className="btn btn-primary" id="submitInput">Go !</button>
                </form>}
                {file === "1" && <div className="input-group mb-3">
                    <input type="file" className="form-control" onChange={handleChangeTextFile} id="inputGroupFile02" accept='text/plain' />
                </div>}

                {newPosition.length !== 0 && <> 
                    <h3>Résumer de l'expédition</h3>
                    <p>Nouvelles positions des rovers : </p>
                    <ul id="listResult">
                        { newPosition.map((rover, i) => <li key={i}>Rover {i+1} : {rover}</li>  ) }
                    </ul>
                </>}
            </aside>
        </div>
    )
}

export default PlateauContainer;