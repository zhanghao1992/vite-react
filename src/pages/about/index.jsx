import {useState, useEffect} from "react";
import {
    RouterProvider,
    Outlet,
    useLocation,
    useParams,
    useSearchParams,
    useNavigate,
} from "react-router-dom";
import {Button, Space, Typography, Divider} from "antd";

const {Title} = Typography;

function About() {
    const [count, setCount] = useState(0);

    const location = useLocation(); ///login?name=csq&age=100
    const params = useParams(); ///login/csq/100
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(params);
    console.log(searchParams);

    const [imgSrc,setImgSrc] = useState('');

    useEffect(() => {

        document.addEventListener('paste', (event) => {
            var clipboardData, pastedData;
            // 防止默认行为
            event.preventDefault();
            // 使用事件对象的clipboardData对象获取剪切板数据
            clipboardData = event.clipboardData || window.clipboardData;
            if (clipboardData.types && clipboardData.types.length) {
                if (clipboardData.types.includes('text/plain')) {
                    pastedData = clipboardData.getData('Text');
                } else if (clipboardData.types.includes('Files') && clipboardData.files && clipboardData.files.length) {
                    const reader = new FileReader();
                    // 文件读取成功完成后的处理
                    reader.onload = (e) => {

                        pastedData = e.target.result;
                        // 在这里使用base64String，例如可以将其设置为图片的src
                        console.log(pastedData);
                        setImgSrc(pastedData);
                    };
                    // 以DataURL的形式读取文件
                    reader.readAsDataURL(clipboardData.files[0]);
                }
            }
            console.log(pastedData);
        });
    }, [])
    return (
        <>
            <Title>about</Title>
            <p>params:{params.id}</p>
            <Divider/>
            <p>searchParams.name:{searchParams.get("name")}</p>

            <img src={imgSrc}/>
        </>
    );
}

export default About;
