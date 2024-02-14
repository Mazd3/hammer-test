import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { useDispatch } from "react-redux";
import { fetchClientsRequest } from "redux/actions";

export const ListContent = ({ match }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClientsRequest());
  }, [dispatch]);

  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${match.url}/:id`}
          component={lazy(() => import(`./UserView`))}
        />
        <Route path={match.url} component={lazy(() => import(`./List`))} />
      </Switch>
    </Suspense>
  );
};

export default React.memo(ListContent);
