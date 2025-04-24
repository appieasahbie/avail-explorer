useEffect(() => {
  let interval;

  const fetchValidators = async () => {
    try {
      const api = await connectToAvail();
      const validatorAddresses = await api.query.session.validators();
      console.log("✅ Validators fetched:", validatorAddresses);
      setValidators(validatorAddresses.map((addr) => addr.toString()));
    } catch (err) {
      console.error("❌ Error fetching validators:", err);
    }
  };

  fetchValidators(); // initial load
  interval = setInterval(fetchValidators, 15000); // refresh every 15s

  return () => clearInterval(interval);
}, []);

