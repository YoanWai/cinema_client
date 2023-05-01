import fetcher from "./fetchWithTokenUtil";

export default async function getFromDbToRedux({ dispatch }) {
  const moviesResponse = await fetcher("/movies", "GET");
  dispatch({ type: "LOAD_MOVIES_FROM_SERVER", payload: moviesResponse.data });
  console.log("Movies: ", moviesResponse.data);

  const membersResponse = await fetcher("/members", "GET");
  dispatch({
    type: "LOAD_MEMBERS_FROM_SERVER",
    payload: membersResponse.data,
  });
  console.log("Members: ", membersResponse.data);

  const subscriptionsResponse = await fetcher("/subscriptions", "GET");
  dispatch({
    type: "LOAD_SUBSCRIPTIONS_FROM_SERVER",
    payload: subscriptionsResponse.data,
  });
  console.log("Subscriptions: ", subscriptionsResponse.data);

  return;
}
