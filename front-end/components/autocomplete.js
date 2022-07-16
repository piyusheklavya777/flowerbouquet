import _ from "lodash";
import { useState } from "react";
import useRequest from "../hooks/use-request";

const AutoComplete = ({ allFlowers, setFlowers, setShowAutoComplete }) => {
  
  const [flowersSuggested, setFlowersSuggested] = useState([]);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const { doRequest, errors } = useRequest({
    url: `/api/bouquet/flower/?namePrefix=${value != "''" ? value : ''}`,
    method: 'get',
  });

  const handleChange = async (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 1) {
		const flowersAPI = await doRequest();
    const flowersFiltered = _.filter(flowersAPI, (flower) => !(_.map(allFlowers, f => f.flowerId)).includes(flower.flowerId));
		setFlowersSuggested(flowersFiltered);
    setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e) => {
    const finalName = e.target.innerText;
    setValue(e.target.innerText);
    const flowerSelected = _.filter(flowersSuggested, list => list.name === finalName)[0];
    appendToFlowers(flowerSelected);
    setValue('');
    setFlowersSuggested([]);
    setSuggestionsActive(false);
    setShowAutoComplete(false);
  };

  const appendToFlowers = (newFlower) => {
    const flowerToAppend = {
      name: newFlower.name,
      price: newFlower.price,
      flowerId: newFlower.flowerId,
      quantity: 1,
    }
    const flowersArr = [...allFlowers, flowerToAppend];
    setFlowers(flowersArr);
  }

  const Suggestions = () => {
    return (
      <ul className="suggestions">
        {flowersSuggested.map((suggestion, index) => {
          return (
            <li
              // className={index === suggestionIndex ? "active" : ""}
              key={index}
              onClick={handleClick}
            >
              {suggestion.name}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        // onKeyDown={handleKeyDown}
      />
      {suggestionsActive && <Suggestions />}
      {errors}
    </div>
  );
  
};

export default AutoComplete;