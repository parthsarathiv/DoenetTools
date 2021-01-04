import React, { useState } from "react";
// import "./styles.css";
import styled from "styled-components";
import MathJax from "react-mathjax";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLevelDownAlt,
  faBackspace,
  faKeyboard,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";

const FunctionPanel = styled.div`
  height: 250px;
  width: 250px;
  background-color: #e2e2e2;
  position: fixed;
  bottom: 247px;
  right: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const TabHeader = styled.button`
  flex-basis: 33%;
  height: 30px;
  background: #e2e2e2;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: ${(props) => (props.selected ? "0.5px solid gray" : "0")};
  border-radius: 0px;
  outline: none;
`;

const Panel = styled.div`
  height: 250px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #e2e2e2;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Section = styled.div`
  height: 150px;
  min-width: 100px;
  max-width: 300px;
  margin-left: 5px;
  margin-right: 5px;
  /* border: 0.5px solid gray; */
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const LettersSection = styled.div`
  height: 150px;
  /* min-width: 100px; */
  max-width: 700px;
  flex-basis: 90%;
  margin-left: 5px;
  margin-right: 5px;
  /* border: 0.5px solid gray; */
  margin-top: auto;
  margin-bottom: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const Button = styled.button`
  flex-basis: 23%;
  height: 30px;
  background: white;
  border: 0;
  border-radius: 3px;
  user-select: none;
  outline: none;
`;

const Button33 = styled.button`
  flex-basis: 30%;
  margin: 2px;
  height: 25px;
  background: white;
  border: 0;
  border-radius: 3px;
  outline: none;
`;

const GrayButton = styled.button`
  flex-basis: 23%;
  height: 30px;
  background: darkgray;
  border: 0;
  border-radius: 3px;
  outline: none;
`;

const Gray15Button = styled.button`
  flex-basis: 14%;
  margin: 1px;
  height: 30px;
  background: darkgray;
  border: 0;
  border-radius: 3px;
  outline: none;
`;

const Gray20Button = styled.button`
  flex-basis: 19%;
  margin: 1px;
  height: 30px;
  background: darkgray;
  border: 0;
  border-radius: 3px;
  outline: none;
`;

const CursorButton = styled.button`
  flex-basis: 45%;
  height: 30px;
  background: darkgray;
  border: 0;
  border-radius: 3px;
  outline: none;
`;

const DeleteButton = styled.button`
  flex-basis: 90%;
  height: 30px;
  background: darkgray;
  border: 0;
  border-radius: 3px;
  outline: none;
`;

const BlueButton = styled.button`
  flex-basis: 90%;
  height: 30px;
  background: #167ac1;
  border: 0;
  border-radius: 3px;
  outline: none;
`;

const Blue20Button = styled.button`
  flex-basis: 19%;
  margin: 1px;
  height: 30px;
  background: #167ac1;
  border: 0;
  border-radius: 3px;
  outline: none;
`;

const LetterButton = styled.button`
  flex-basis: 9%;
  margin: 1px;
  height: 30px;
  background: white;
  /* background: #167ac1; */
  border: 0;
  border-radius: 3px;
  outline: none;
`;

const ToggleButton = styled.button`
  height: 50px;
  position: fixed;
  bottom: ${(props) => (props.toggleState ? "247px" : "5px")};
  left: 0;
  width: 50px;
  background-color: #e2e2e2;
  border: 0;
  border-radius: 3px;
  outline: none;
`;

export default function VirtualKeyboard(props) {
  const [toggleKeyboard, setToggleKeyboard] = useState(false);
  const [toggleLetters, setToggleLetters] = useState(false);
  const [toggleFunctions, setToggleFunctions] = useState(false);
  const [toggleCase, setToggleCase] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Trig");

  const handleToggleKeyboard = () => {
    setToggleFunctions(toggleKeyboard ? false : toggleFunctions);
    setToggleKeyboard(!toggleKeyboard);
  };

  const handleToggleLetters = () => {
    setToggleLetters(!toggleLetters);
  };

  const handleToggleCase = () => {
    setToggleCase(!toggleCase);
  };

  const handleToggleFunctions = () => {
    setToggleFunctions(!toggleFunctions);
  };

  const handleTabSelection = (e) => {
    setSelectedTab(e.target.value);
  };

  return (
    <>
      <ToggleButton toggleState={toggleKeyboard} onClick={handleToggleKeyboard}>
        <FontAwesomeIcon icon={faKeyboard} />
      </ToggleButton>
      {toggleFunctions ? (
        <FunctionPanel>
          <TabHeader
            onClick={handleTabSelection}
            value="Trig"
            selected={selectedTab === "Trig"}
          >
            Trig
          </TabHeader>
          <TabHeader
            onClick={handleTabSelection}
            value="Stat"
            selected={selectedTab === "Stat"}
          >
            Stat
          </TabHeader>
          <TabHeader
            onClick={handleTabSelection}
            value="Misc"
            selected={selectedTab === "Misc"}
          >
            Misc
          </TabHeader>
          {selectedTab === "Trig" ? (
            <>
              <Button33 value = {'cmd \\sin'} onClick = {() => props.callback('cmd \\sin')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\sin"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'write \\sin^{-1}'} onClick = {() => props.callback('write \\sin^{-1}')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\sin^{-1}"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'cmd \\sinh'} onClick = {() => props.callback('cmd \\sinh')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\sinh"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'cmd \\tan'} onClick = {() => props.callback('cmd \\tan')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\tan"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'write \\tan^{-1}'} onClick = {() => props.callback('write \\tan^{-1}')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\tan^{-1}"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'cmd \\tanh'} onClick = {() => props.callback('cmd \\tanh')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\tanh"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'cmd \\cos'} onClick = {() => props.callback('cmd \\cos')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\cos"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'write \\cos^{-1}'} onClick = {() => props.callback('write \\cos^{-1}')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\cos^{-1}"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'cmd \\cosh'} onClick = {() => props.callback('cmd \\cosh')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\cosh"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'cmd \\csc'} onClick = {() => props.callback('cmd \\csc')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\csc"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'write \\csc^{-1}'} onClick = {() => props.callback('write \\csc^{-1}')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\csc^{-1}"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'cmd \\csch'} onClick = {() => props.callback('cmd \\csch')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"csch"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'cmd \\cot'} onClick = {() => props.callback('cmd \\cot')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\cot"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'write \\cot^{-1}'} onClick = {() => props.callback('write \\cot^{-1}')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\cot^{-1}"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'cmd \\coth'} onClick = {() => props.callback('cmd \\coth')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"coth"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'cmd \\sec'} onClick = {() => props.callback('cmd \\sec')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\sec"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'write \\sec^{-1}'} onClick = {() => props.callback('write \\sec^{-1}')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\sec^{-1}"} />
                </MathJax.Provider>
              </Button33>
              <Button33 value = {'cmd \\sech'} onClick = {() => props.callback('cmd \\sech')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"sech"} />
                </MathJax.Provider>
              </Button33>
            </>
          ) : selectedTab === "Stat" ? (
            <Button value = {'cmd \\sqrt'} onClick = {() => props.callback('cmd \\sqrt')}>mean</Button>
          ) : (
            <Button value = {'cmd \\int'} onClick = {() => props.callback('cmd \\int')}>
              <MathJax.Provider>
                  <MathJax.Node inline formula={"\\int"} />
                </MathJax.Provider>
            </Button>
          )}
        </FunctionPanel>
      ) : null}
      {toggleKeyboard ? (
        toggleLetters ? (
          toggleCase ? (
            <Panel>
              <LettersSection>
                <LetterButton value = {'write Q'} onClick = {() => props.callback('write Q')}>Q</LetterButton>
                <LetterButton value = {'write W'} onClick = {() => props.callback('write W')}>W</LetterButton>
                <LetterButton value = {'write E'} onClick = {() => props.callback('write E')}>E</LetterButton>
                <LetterButton value = {'write R'} onClick = {() => props.callback('write R')}>R</LetterButton>
                <LetterButton value = {'write T'} onClick = {() => props.callback('write T')}>T</LetterButton>
                <LetterButton value = {'write Y'} onClick = {() => props.callback('write Y')}>Y</LetterButton>
                <LetterButton value = {'write U'} onClick = {() => props.callback('write U')}>U</LetterButton>
                <LetterButton value = {'write I'} onClick = {() => props.callback('write I')}>I</LetterButton>
                <LetterButton value = {'write O'} onClick = {() => props.callback('write O')}>O</LetterButton>
                <LetterButton value = {'write P'} onClick = {() => props.callback('write P')}>P</LetterButton>
                <LetterButton value = {'write A'} onClick = {() => props.callback('write A')}>A</LetterButton>
                <LetterButton value = {'write S'} onClick = {() => props.callback('write S')}>S</LetterButton>
                <LetterButton value = {'write D'} onClick = {() => props.callback('write D')}>D</LetterButton>
                <LetterButton value = {'write F'} onClick = {() => props.callback('write F')}>F</LetterButton>
                <LetterButton value = {'write G'} onClick = {() => props.callback('write G')}>G</LetterButton>
                <LetterButton value = {'write H'} onClick = {() => props.callback('write H')}>H</LetterButton>
                <LetterButton value = {'write J'} onClick = {() => props.callback('write J')}>J</LetterButton>
                <LetterButton value = {'write K'} onClick = {() => props.callback('write K')}>K</LetterButton>
                <LetterButton value = {'write L'} onClick = {() => props.callback('write L')}>L</LetterButton>
                <LetterButton value = {'write \\tau'} onClick = {() => props.callback('write \\tau')}>
                  <MathJax.Provider>
                    <MathJax.Node inline formula={"\\tau"} />
                  </MathJax.Provider>
                </LetterButton>
                <Gray15Button onClick={handleToggleCase}>
                  <FontAwesomeIcon icon={faArrowUp} />
                </Gray15Button>
                <LetterButton value = {'write Z'} onClick = {() => props.callback('write Z')}>Z</LetterButton>
                <LetterButton value = {'write X'} onClick = {() => props.callback('write X')}>X</LetterButton>
                <LetterButton value = {'write C'} onClick = {() => props.callback('write C')}>C</LetterButton>
                <LetterButton value = {'write V'} onClick = {() => props.callback('write V')}>V</LetterButton>
                <LetterButton value = {'write B'} onClick = {() => props.callback('write B')}>B</LetterButton>
                <LetterButton value = {'write N'} onClick = {() => props.callback('write N')}>N</LetterButton>
                <LetterButton value = {'write M'} onClick = {() => props.callback('write M')}>M</LetterButton>
                <Gray15Button value = {'keystroke Backspace'} onClick = {() => props.callback('keystroke Backspace')}>
                  <FontAwesomeIcon icon={faBackspace} />
                </Gray15Button>
                <Gray20Button onClick={handleToggleLetters}>123</Gray20Button>
                <LetterButton value = {'cmd ^'} onClick = {() => props.callback('cmd ^')}>
                  <MathJax.Provider>
                    <MathJax.Node inline formula={"a^b"} />
                  </MathJax.Provider>
                </LetterButton>
                <LetterButton value = {'write %'} onClick = {() => props.callback('write %')}>%</LetterButton>
                <LetterButton value = {'cmd ]'} onClick = {() => props.callback('cmd ]')}>]</LetterButton>
                <LetterButton value = {'cmd }'} onClick = {() => props.callback('cmd }')}>{`}`}</LetterButton>
                <LetterButton value = {'write :'} onClick = {() => props.callback('write :')}>:</LetterButton>
                <LetterButton value = {'write \''} onClick = {() => props.callback('write \'')}>'</LetterButton>
                <Blue20Button>
                  <FontAwesomeIcon
                    icon={faLevelDownAlt}
                    transform={{ rotate: 90 }}
                  />
                </Blue20Button>
              </LettersSection>
            </Panel>
          ) : (
            <Panel>
              <LettersSection>
                <LetterButton value = {'write q'} onClick = {() => props.callback('write q')}>q</LetterButton>
                <LetterButton value = {'write w'} onClick = {() => props.callback('write w')}>w</LetterButton>
                <LetterButton value = {'write e'} onClick = {() => props.callback('write e')}>e</LetterButton>
                <LetterButton value = {'write r'} onClick = {() => props.callback('write r')}>r</LetterButton>
                <LetterButton value = {'write t'} onClick = {() => props.callback('write t')}>t</LetterButton>
                <LetterButton value = {'write y'} onClick = {() => props.callback('write y')}>y</LetterButton>
                <LetterButton value = {'write u'} onClick = {() => props.callback('write u')}>u</LetterButton>
                <LetterButton value = {'write i'} onClick = {() => props.callback('write i')}>i</LetterButton>
                <LetterButton value = {'write o'} onClick = {() => props.callback('write o')}>o</LetterButton>
                <LetterButton value = {'write p'} onClick = {() => props.callback('write p')}>p</LetterButton>
                <LetterButton value = {'write a'} onClick = {() => props.callback('write a')}>a</LetterButton>
                <LetterButton value = {'write s'} onClick = {() => props.callback('write s')}>s</LetterButton>
                <LetterButton value = {'write d'} onClick = {() => props.callback('write d')}>d</LetterButton>
                <LetterButton value = {'write f'} onClick = {() => props.callback('write f')}>f</LetterButton>
                <LetterButton value = {'write g'} onClick = {() => props.callback('write g')}>g</LetterButton>
                <LetterButton value = {'write h'} onClick = {() => props.callback('write h')}>h</LetterButton>
                <LetterButton value = {'write j'} onClick = {() => props.callback('write j')}>j</LetterButton>
                <LetterButton value = {'write k'} onClick = {() => props.callback('write k')}>k</LetterButton>
                <LetterButton value = {'write l'} onClick = {() => props.callback('write l')}>l</LetterButton>
                <LetterButton value = {'write \\theta'} onClick = {() => props.callback('write \\theta')}>
                  <MathJax.Provider>
                    <MathJax.Node inline formula={"\\theta"} />
                  </MathJax.Provider>
                </LetterButton>
                <Gray15Button onClick={handleToggleCase}>
                  <FontAwesomeIcon icon={faArrowUp} />
                </Gray15Button>
                <LetterButton value = {'write z'} onClick = {() => props.callback('write z')}>z</LetterButton>
                <LetterButton value = {'write x'} onClick = {() => props.callback('write x')}>x</LetterButton>
                <LetterButton value = {'write c'} onClick = {() => props.callback('write c')}>c</LetterButton>
                <LetterButton value = {'write v'} onClick = {() => props.callback('write v')}>v</LetterButton>
                <LetterButton value = {'write b'} onClick = {() => props.callback('write b')}>b</LetterButton>
                <LetterButton value = {'write n'} onClick = {() => props.callback('write n')}>n</LetterButton>
                <LetterButton value = {'write m'} onClick = {() => props.callback('write m')}>m</LetterButton>
                <Gray15Button value = {'keystroke Backspace'} onClick = {() => props.callback('keystroke Backspace')}>
                  <FontAwesomeIcon icon={faBackspace} />
                </Gray15Button>
                <Gray20Button onClick={handleToggleLetters}>123</Gray20Button>
                <LetterButton value = {'cmd _'} onClick = {() => props.callback('cmd _')}>
                  <MathJax.Provider>
                    <MathJax.Node inline formula={"a_b"} />
                  </MathJax.Provider>
                </LetterButton>
                <LetterButton value = {'write !'} onClick = {() => props.callback('write !')}>!</LetterButton>
                <LetterButton value = {'cmd ['} onClick = {() => props.callback('cmd [')}>[</LetterButton>
                <LetterButton value = {'cmd {'} onClick = {() => props.callback('cmd {')}>{`{`}</LetterButton>
                <LetterButton value = {'write ~'} onClick = {() => props.callback('write ~')}>~</LetterButton>
                <LetterButton value = {'write ,'} onClick = {() => props.callback('write ,')}>,</LetterButton>
                <Blue20Button>
                  <FontAwesomeIcon
                    icon={faLevelDownAlt}
                    transform={{ rotate: 90 }}
                  />
                </Blue20Button>
              </LettersSection>
            </Panel>
          )
        ) : (
          <Panel>
            <Section>
              <Button value = {'write x'} onClick = {() => props.callback('write x')}>
                <MathJax.Provider >
                  <MathJax.Node inline formula={"x"} />
                </MathJax.Provider>
              </Button>
              <Button onClick = {() => props.callback('write y')}>
                <MathJax.Provider >
                  <MathJax.Node inline formula={"y"} />
                </MathJax.Provider>
              </Button>
              <Button value = {'write \\^{2}'} onClick = {() => props.callback('write \\^{2}')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"a^2"} />
                </MathJax.Provider>
              </Button>
              <Button value = {'cmd ^'} onClick = {() => props.callback('cmd ^')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"a^b"} />
                </MathJax.Provider>
              </Button>
              <Button value = {'cmd ('} onClick = {() => props.callback('cmd (')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"("} />
                </MathJax.Provider>
              </Button>
              <Button value = {'keystroke Right'} onClick = {() => props.callback('keystroke Right')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={")"} />
                </MathJax.Provider>
              </Button>
              <Button value = {'write <'} onClick = {() => props.callback('write <')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"<"} />
                </MathJax.Provider>
              </Button>
              <Button value = {'write >'} onClick = {() => props.callback('write >')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={">"} />
                </MathJax.Provider>
              </Button>
              <Button value = {'cmd |'} onClick = {() => props.callback('cmd |')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"|a|"} />
                </MathJax.Provider>
              </Button>
              <Button value = {'write ,'} onClick = {() => props.callback('write ,')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={","} />
                </MathJax.Provider>
              </Button>
              <Button value = {'write \\leq'} onClick = {() => props.callback('write \\leq')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\leq"} />
                </MathJax.Provider>
              </Button>
              <Button value = {'write \\geq'} onClick = {() => props.callback('write \\geq')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\geq"} />
                </MathJax.Provider>
              </Button>
              <GrayButton onClick={handleToggleLetters}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"ABC"} />
                </MathJax.Provider>
              </GrayButton>
              <Button value = {'cmd \\sqrt'} onClick = {() => props.callback('cmd \\sqrt')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\sqrt{}"} />
                </MathJax.Provider>
              </Button>
              <Button value = {'write \\theta'} onClick = {() => props.callback('write \\theta')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\theta"} />
                </MathJax.Provider>
              </Button>
              <Button value = {'write \\pi'} onClick = {() => props.callback('write \\pi')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\pi"} />
                </MathJax.Provider>
              </Button>
            </Section>
            <Section>
              <GrayButton value = {'write 7'} onClick = {() => props.callback('write 7')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"7"} />
                </MathJax.Provider>
              </GrayButton>
              <GrayButton value = {'write 8'} onClick = {() => props.callback('write 8')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"8"} />
                </MathJax.Provider>
              </GrayButton>
              <GrayButton value = {'write 9'} onClick = {() => props.callback('write 9')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"9"} />
                </MathJax.Provider>
              </GrayButton>
              <Button value = {'cmd /'} onClick = {() => props.callback('cmd /')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\div"} />
                </MathJax.Provider>
              </Button>
              <GrayButton value = {'write 4'} onClick = {() => props.callback('write 4')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"4"} />
                </MathJax.Provider>
              </GrayButton>
              <GrayButton value = {'write 5'} onClick = {() => props.callback('write 5')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"5"} />
                </MathJax.Provider>
              </GrayButton>
              <GrayButton value = {'write 6'} onClick = {() => props.callback('write 6')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"6"} />
                </MathJax.Provider>
              </GrayButton>
              <Button value = {'cmd \\cdot'} onClick = {() => props.callback('cmd \\cdot')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\times"} />
                </MathJax.Provider>
              </Button>
              <GrayButton value = {'write 1'} onClick = {() => props.callback('write 1')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"1"} />
                </MathJax.Provider>
              </GrayButton>
              <GrayButton value = {'write 2'} onClick = {() => props.callback('write 2')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"2"} />
                </MathJax.Provider>
              </GrayButton>
              <GrayButton value = {'write 3'} onClick = {() => props.callback('write 3')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"3"} />
                </MathJax.Provider>
              </GrayButton>
              <Button value = {'cmd -'} onClick = {() => props.callback('cmd -')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"-"} />
                </MathJax.Provider>
              </Button>
              <GrayButton value = {'write 0'} onClick = {() => props.callback('write 0')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"0"} />
                </MathJax.Provider>
              </GrayButton>
              <GrayButton value = {'write .'} onClick = {() => props.callback('write .')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"."} />
                </MathJax.Provider>
              </GrayButton>
              <Button value = {'write ='} onClick = {() => props.callback('write =')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"="} />
                </MathJax.Provider>
              </Button>
              <Button value = {'write +'} onClick = {() => props.callback('write +')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"+"} />
                </MathJax.Provider>
              </Button>
            </Section>
            <Section>
              <BlueButton onClick={handleToggleFunctions}>functions</BlueButton>
              <CursorButton value = {'keystroke Left'} onClick = {() => props.callback('keystroke Left')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\leftarrow"} />
                </MathJax.Provider>
              </CursorButton>
              <CursorButton value = {'keystroke Right'} onClick = {() => props.callback('keystroke Right')}>
                <MathJax.Provider>
                  <MathJax.Node inline formula={"\\rightarrow"} />
                </MathJax.Provider>
              </CursorButton>
              <DeleteButton value = {'keystroke Backspace'} onClick = {() => props.callback('keystroke Backspace')}>
                <FontAwesomeIcon icon={faBackspace} />
              </DeleteButton>
              <BlueButton>
                <FontAwesomeIcon
                  icon={faLevelDownAlt}
                  transform={{ rotate: 90 }}
                />
              </BlueButton>
            </Section>
          </Panel>
        )
      ) : null}
    </>
  );
}

// export default function VirtualKeyboard() {
//   // module.exports = () => {
//   return (
//     <MathJax.Context input="ascii">
//       <MathJax.Node>{"x^2"}</MathJax.Node>
// <Panel>
//   <Section>
//     <Button></Button>
//   </Section>
//   <Section />
//   <Section />
// </Panel>
//     </MathJax.Context>
//   );
// }
