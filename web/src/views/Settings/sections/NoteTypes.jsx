import { useMemo, useState, useEffect, useCallback } from "react";
import { v4 } from "uuid";
import { sortBy } from "some-javascript-utils/array";
import PropTypes from "prop-types";

import {
  faAdd,
  faArrowDownAZ,
  faArrowUpAZ,
} from "@fortawesome/free-solid-svg-icons";

// @sito/ui
import { IconButton } from "@sito/ui";

// providers
import { useUser } from "../../../providers/UserProvider";

// services
import {
  updateType,
  deleteType,
  fetchTypes,
  addType as addType,
} from "../../../services/wallet";

// components
import Type from "../components/Type/Type";

function NoteTypes({ setSync }) {
  const { userState, setUserState } = useUser();

  const [loadingTypes, setLoadingTypes] = useState(true);

  const [asc, setAsc] = useState(false);

  const [toUpdate, setToUpdate] = useState({});

  const updateLocalType = async (type) => {
    const types = [...userState.types];
    const index = types.findIndex((b) => b.id === type.id);
    if (index >= 0) {
      if (type.description) types[index].description = type.value;
      if (type.bill) types[index].bill = type.value;
      delete type.value;
      if (!userState.cached) {
        const { data, error } = await updateType(types[index]);
        if (error && error !== null) {
          setSync(false);
          return console.error(error.message);
        }
        if (data.length) types[index] = data[0];
      }
      setUserState({ type: "init-types", types });
    }

    setSync(false);
  };

  useEffect(() => {
    if (Object.keys(toUpdate).length) updateLocalType(toUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toUpdate]);

  const handleTypeDescription = useCallback(
    (type) => setToUpdate({ ...type, description: true }),
    []
  );

  const printTypes = useMemo(() => {
    const types = userState.types;
    if (loadingTypes) {
      return [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <li key={item}>
          <div className="w-full h-[44px] skeleton-box" />
        </li>
      ));
    }

    if (types)
      return sortBy(types, "description", asc).map((type) => {
        return (
          <li key={type.id} className="appear">
            <Type
              {...type}
              onChangeDescription={(value) => {
                setSync(true);
                handleTypeDescription({ value, id: type.id });
              }}
              onDelete={async () => {
                setSync(true);
                const newTypes = [...types];
                if (!userState.cached) {
                  const { error } = await deleteType(type.id);

                  newTypes.splice(
                    newTypes.findIndex(
                      (typeR) => typeR.id === type.id
                    ),
                    1
                  );

                  if (error && error !== null) console.error(error.message);
                } else {
                  newTypes[
                    newTypes.findIndex((typeR) => typeR.id === type.id)
                  ].deleted = true;
                }
                setUserState({
                  type: "init-types",
                  types: newTypes,
                });
                setSync(false);
              }}
            />
          </li>
        );
      });
    return <></>;
  }, [
    setSync,
    loadingTypes,
    userState.cached,
    userState.types,
    asc,
    handleTypeDescription,
    handleTypeBill,
    setUserState,
  ]);

  const addType = async () => {
    const newType = {
      id: v4(),
      description: "Nuevo tipo",
      bill: true,
      created_at: new Date().getTime(),
    };
    if (!userState.cached) {
      const { error } = await addRemoteType(newType);
      if (error && error !== null) console.error(error.message);
    }
    setUserState({
      type: "init-types",
      types: [...userState.types, newType],
    });
    return newType.id;
  };

  const init = async () => {
    setLoadingTypes(true);
    if (!userState.cached) {
      const { data, error } = await fetchTypes();
      if (error && error !== null) {
        setLoadingTypes(false);
        return console.error(error.message);
      }
      if (!data.length && localStorage.getItem("basic-type") === null) {
        const basicType = {
          id: v4(),
          created_at: new Date().getTime(),
          description: "Gastos básicos",
          bill: true,
        };
        localStorage.setItem("basic-type", "Gastos básicos");
        const insertBasic = await addRemoteType(basicType);
        if (insertBasic.error && insertBasic.error !== null)
          console.error(insertBasic.error.message);
        setUserState({
          type: "init-types",
          types: [basicType],
        });
      } else {
        // setting
        setUserState({
          type: "init-types",
          types: data,
        });
      }
    }

    setLoadingTypes(false);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="w-full flex items-center justify-between">
        <h3 className="text-xl">Mis tipos de types</h3>
        <div className="flex gap-3 items-center">
          <IconButton
            name="filter"
            tooltip="Ordenar tipos de type"
            aria-label="Ordenar tipos de type"
            onClick={() => setAsc((asc) => !asc)}
            icon={asc ? faArrowDownAZ : faArrowUpAZ}
          />
          <IconButton
            aria-label="Agregar tipo de type"
            tooltip="Agregar tipo de type"
            name="add-type"
            onClick={addType}
            icon={faAdd}
          />
        </div>
      </div>
      <ul>{printTypes}</ul>
    </section>
  );
}

TypeTypes.propTypes = {
  setSync: PropTypes.func,
};

export default TypeTypes;
