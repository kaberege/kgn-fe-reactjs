export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  let spaned = "";

  if (props.value === 1) {
    spaned = <div className="die-one"></div>;
  }

  if (props.value === 2) {
    spaned = (
      <div className="die-two-container">
        <div className="die-two-content"></div>
        <div className="die-two-content"></div>
      </div>
    );
  }
  if (props.value === 3) {
    spaned = (
      <div className="die-three-container">
        <div className="die-three-content"></div>
        <div className="die-three-content"></div>
        <div className="die-three-content"></div>
      </div>
    );
  }

  if (props.value === 4) {
    spaned = (
      <div className="die-four-container">
        <div className="die-four-content"></div>
        <div className="die-four-content"></div>
        <div className="die-four-content"></div>
        <div className="die-four-content"></div>
      </div>
    );
  }

  if (props.value === 5) {
    spaned = (
      <div className="die-five-container">
        <div className="die-five-content"></div>
        <div className="die-five-content"></div>
        <div className="die-five-content die-five-content-area"></div>
        <div className="die-five-content"></div>
        <div className="die-five-content"></div>
      </div>
    );
  }
  if (props.value === 6) {
    spaned = (
      <div className="die-six-container">
        <div className="die-six-content"></div>
        <div className="die-six-content"></div>
        <div className="die-six-content"></div>
        <div className="die-six-content"></div>
        <div className="die-six-content"></div>
        <div className="die-six-content"></div>
      </div>
    );
  }

  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      {spaned}
    </div>
  );
}
