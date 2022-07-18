import axios from 'axios';
import { useState } from 'react';
import _ from 'lodash';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (props = {}) => {
    try {
      setErrors(null);
      // console.log('props', props);
      const response = await axios[method](url, { ...body, ...props });

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (e) {
      console.log('lol', e);
      const error = _.get(e, ['response', 'data']);
      if (error) {
        setErrors(
          <div className="alert alert-danger">
            <h4>{error.error}</h4>
            <ul className="my-0">
              {error.description}
            </ul>
          </div>
        );
      } else {
        setErrors(
          <div className="alert alert-danger">
            <h4>Unknown error occurred. Check console.</h4>
          </div>
        );
      }
    }
  };

  return { doRequest, errors };
};
