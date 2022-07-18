import _ from "lodash";
import { useState } from "react";
import useRequest from "../../hooks/use-request";

const AutoComplete = ({ allBouquets, setBouquets }) => {
  
  const [bouquetsSuggested, setBouquetsSuggested] = useState([]);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState("");

  const { doRequest, errors } = useRequest({
    url: `/api/order/bouquet/?namePrefix=${value != "''" ? value : ''}`,
    method: 'get',
  });

  const handleChange = async (e) => {
    const query = e.target.value;
    setValue(query);
    if (query.length > 1) {
		const bouquetsAPI = await doRequest();
    console.log('bouquets', {value, bouquetsAPI, url: `/api/order/bouquet/?namePrefix=${value != "''" ? value : ''}`})
    const bouquetsFiltered = _.filter(bouquetsAPI, (bouquet) => !(_.map(allBouquets, b => b.bouquetId)).includes(bouquet.bouquetId));
		setBouquetsSuggested(bouquetsFiltered);
    setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e) => {
    const finalName = e.target.innerText;
    setValue(e.target.innerText);
    const bouquetSelected = _.filter(bouquetsSuggested, list => list.name === finalName)[0];
    appendToBouquets(bouquetSelected);
    setValue('');
    setBouquetsSuggested([]);
    setSuggestionsActive(false);
  };

  const appendToBouquets = (newBouquet) => {
    const bouquetToAppend = {
      name: newBouquet.name,
      discount: newBouquet.discount,
      bouquetId: newBouquet.bouquetId,
      flowers: newBouquet.flowers,
    }
    const bouquetArr = [...allBouquets, bouquetToAppend];
    setBouquets(bouquetArr);
  }

  const Suggestions = () => {
    return (
      <ul className="suggestions">
        {bouquetsSuggested.map((suggestion, index) => {
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
        placeholder="Enter a Bouquet Name"
        onChange={handleChange}
        // onKeyDown={handleKeyDown}
      />
      {suggestionsActive && <Suggestions />}
      {errors}
    </div>
  );
  
};

export default AutoComplete;