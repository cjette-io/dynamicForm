import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import DynamicFormService from "./services";
import { submitData, getElements } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";

const renderInput = (input) => {
  const { fieldName, value, ...props } = input;
  if (input.type === "select") {
    return (
      <Select
        variant="outlined"
        fullWidth={true}
        {...props}
        defaultValue={input.value}
        label={input.fieldName}
        name={input.fieldName}
        required={!input.type === "gender"}
      >
        {input.options.map((option, key) => (
          <MenuItem key={key} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    );
  } else {
    return (
      <TextField
        multiline={input.type === "multiline"}
        variant="outlined"
        fullWidth={true}
        required={["age", "testimonial"].includes(input.type)}
        {...props}
        defaultValue={input.value}
        label={input.fieldName}
        name={input.fieldName}
      />
    );
  }
};

let DynamicForm = () => {
  const [response, setResponse] = useState();
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const fields = useSelector((state) => {
    return state.formFields.formFields;
  });

  const submit = (e) => {
    setSubmitting(true);
    e.preventDefault();
    console.log(fields);
    const data = fields.reduce(function (result, item, index) {
      console.log({ result, item, index });
      result[item.fieldName] = item.value;
      return result;
    }, {});
    console.log(data);

    DynamicFormService.submit(data)
      .then((response) => {
        setResponse(response);
        console.log({ response });
        dispatch(submitData(response.data.data));
      })
      .catch((e) => {
        console.log(e);
      });
    setSubmitting(false);
  };

  const getFormFields = () => {
    DynamicFormService.getFormElements()
      .then((response) => {
        dispatch(getElements(response.data.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getFormFields();
  }, []);
  console.log({ response });
  return (
    <div className="Form">
      <Grid style={{ padding: "80px 5px 20px 5px" }}>
        <Typography
          style={{ marginBottom: 20 }}
          variant="h4"
          color="primary"
          align="left"
        >
          Dynamic Form
        </Typography>
        <form>
          <Grid container spacing={1}>
            {fields &&
              fields.map((input, key) => (
                <Grid key={key} xs={12} sm={12} item>
                  {renderInput(input)}
                </Grid>
              ))}
          </Grid>
          <Grid
            style={{ marginTop: 20 }}
            item
            xs={12}
            align="center"
            margin={23}
          >
            <Button
              disabled={submitting}
              type="button"
              onClick={submit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </form>
      </Grid>
      <Grid>{response && JSON.stringify(response.data)}</Grid>
    </div>
  );
};

export default DynamicForm;
