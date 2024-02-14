import React, { useCallback, useEffect, useRef, useState } from "react";
import "./style.css";
import { Button, Card, Upload } from "antd";
import Flex from "components/shared-components/Flex";

const ENTITIES = [
  {
    id: 0,
    name: "Стол",
    img: "https://idei.club/raznoe/uploads/posts/2023-05/1685343702_idei-club-p-obedennii-stol-vid-sverkhu-dizain-vkontakt-31.png",
  },
  {
    id: 1,
    name: "Стул",
    img: "https://cdn-icons-png.flaticon.com/512/1678/1678872.png",
  },
];

const DrawComponent = () => {
  const ref = useRef();
  const [selected, setSelected] = useState(null);
  const [target, setTarget] = useState(null);
  const [elements, setElements] = useState([
    { id: 0, x: 120, y: 80 },
    { id: 1, x: 140, y: 60 },
  ]);

  const handlerMoveMouse = useCallback(
    (e) => {
      const rect = ref.current.getBoundingClientRect();
      if (target === null) return;
      setElements((prev) => [
        ...prev.map((element, index) => {
          if (index === target) {
            return {
              ...element,
              x: e.clientX - rect.left - 50,
              y: e.clientY - rect.top - 50,
            };
          }
          return element;
        }),
      ]);
    },
    [target]
  );

  function triggerDownload(fileName) {
    var element = document.createElement("a");
    element.setAttribute("href", fileName);
    element.setAttribute("download", "plan.txt");
    element.textContent = "asd";
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  useEffect(() => {
    const _ref = ref.current;
    _ref.addEventListener("mousemove", handlerMoveMouse);
    return () => {
      _ref.removeEventListener("mousemove", handlerMoveMouse);
    };
  }, [handlerMoveMouse]);

  return (
    <div className="planner">
      <div className="planner_controls">
        <Flex>
          {ENTITIES.map((entity) => (
            <Card key={entity.id}>
              <Flex flexDirection="column">
                <img width={100} height={100} src={entity.img} alt="" />
                <br />
                <Button
                  onClick={() =>
                    setElements([...elements, { id: entity.id, x: 0, y: 0 }])
                  }
                >
                  Добавить
                </Button>
              </Flex>
            </Card>
          ))}
        </Flex>

        <div className="planner_coordinates-list">
          {elements.map((element, index) => (
            <div
              key={index}
              onClick={() => setSelected(index)}
              className="planner_coordinates-item"
              style={{
                border:
                  index === selected ? "1px solid gray" : "1px solid white",
              }}
            >
              <div className="planner_coordinate-item">x: {element.x}</div>
              <div className="planner_coordinate-item">y: {element.y}</div>
              <Button
                onClick={() =>
                  setElements(elements.filter((_, i) => i !== index))
                }
              >
                Удалить
              </Button>
            </div>
          ))}
        </div>
        <div className="planner_import-export">
          <Upload
            accept="text/plain"
            showUploadList={false}
            onChange={(e) => {
              let file = e.file.originFileObj;
              let reader = new FileReader();
              reader.readAsText(file);

              reader.onload = () => {
                setElements(JSON.parse(reader.result));
              };

              reader.onerror = () => {
                console.log(reader.error);
              };
            }}
          >
            <Button>Загрузить</Button>
          </Upload>
          <Button
            onClick={() => {
              let el = new File([JSON.stringify(elements)], "draw.txt", {
                type: "text/plain",
              });
              var url = window.URL.createObjectURL(el);
              triggerDownload(url);
            }}
          >
            Сохранить
          </Button>
        </div>
      </div>

      <div ref={ref} className="planner_draw-container">
        {elements.map((element, index) => (
          <img
            draggable={false}
            src={ENTITIES.find((entity) => entity.id === element.id)?.img}
            alt=""
            key={index}
            id={index}
            className="planner_image"
            style={{
              left: element.x,
              top: element.y,
              backgroundColor: index === selected ? "gray" : "white",
            }}
            onMouseDown={() => {
              setTarget(index);
              setSelected(index);
            }}
            onMouseUp={() => setTarget(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default DrawComponent;
