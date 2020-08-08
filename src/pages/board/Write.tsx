import React, {useState} from 'react';
import SEO from "../SEO/SEO";
import produce from "immer";
import ModalWrite from "../../constants/board/ModalWrite";
import PageWrite from "../../constants/board/PageWrite";
import axios from "axios";

interface propsType {
    isOpen: any;
}

const Write: React.FC<propsType> = ({isOpen}) => {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [tag, setTag] = useState('');
    const [tagList, setTagList] = useState([]);
    const [imgList, setImgList] = useState([]);
    const [previewList, setPreviewList] = useState([]);

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const changeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';

        setContents(e.target.value);
    }

    const loadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;

        console.log(files);

        Array.from(files).map((file: File, index: number) => {
            //사이즈 유효성
            if (file.size > 2 * 1024 * 1024) {
                alert('이미지 사이즈가 2mb를 넘습니다.');
            } else {
                //선택한 이미지 개수 + 이미 고른 이미지 개수 = 6 크.. 난 천재!
                if (index < (6 - imgList.length) && imgList.length < (6 - index)) {
                    // 이미지 file 정보 담기
                    setImgList(produce(draft => {
                        draft.push(file);
                    }));

                    //이미지 url 정보 담기
                    let reader = new FileReader();
                    reader.onloadend = () => {
                        setPreviewList(produce(draft => {
                            draft.push(reader.result);
                        }));
                    }
                    reader.readAsDataURL(file);
                } else {
                    alert('최대 6개까지 첨부할 수 있습니다.');
                }
            }
        });
    }
    const deleteImg = (index: number) => {
        setImgList(produce(draft => {
            draft.splice(index, 1);
        }));
        setPreviewList(produce(draft => {
            draft.splice(index, 1);
        }));
    }

    const changeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTag(e.target.value);
    }
    const onEnter = (e: React.KeyboardEvent) => {
        if (tagList.length >= 10) {
            //모달 필요
            alert('최대 10개까지 가능합니다');
            setTag('');
        } else {
            if (e.key === 'Enter') {
                setTagList(produce(draft => {
                    draft.push(tag);
                }));
                setTag('');
            }
        }
    }
    const deleteTag = (index: number) => {
        setTagList(produce(draft => {
            draft.splice(index, 1);
        }));
    }

    const goWrite = async () => {
        try {
            let formData = new FormData();

            formData.append('title', title);
            formData.append('contents', contents);
            imgList.map((img: File, index: number) => {
                formData.append('images[]', imgList[index]);
            });
            tagList.map((tag: string, index: number) => {
                formData.append('hashTags[]', tagList[index]);
            });

            let response = await axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                url: '/api/board/create',
                data: formData
            });
            if (response.status === 204) {
                console.log(response);
                window.location.href = '/';
            }
        } catch (err) {
            if (err.response.status === 401) {
                alert('로그인이 필요합니다.');
            } else {
                console.error(err.response);
            }
        }
    }
    return (
        <>
            <SEO title="작성페이지 | 스쿨빌런"
                 description="스쿨빌런 게시물 작성 페이지입니다."
                 keywords="스쿨빌런 게시물 작성 페이지"/>
            {
                window.screen.width > 480 ?
                    <ModalWrite isOpen={isOpen}
                                title={title}
                                changeTitle={changeTitle}

                                contents={contents}
                                changeContents={changeContents}

                                tag={tag}
                                tagList={tagList}
                                changeTag={changeTag}
                                onEnter={onEnter}
                                deleteTag={deleteTag}

                                loadImg={loadImg}
                                deleteImg={deleteImg}
                                previewList={previewList}

                                goWrite={goWrite}/>
                    :
                    <PageWrite title={title}
                               changeTitle={changeTitle}

                               contents={contents}
                               changeContents={changeContents}

                               tag={tag}
                               tagList={tagList}
                               changeTag={changeTag}
                               onEnter={onEnter}
                               deleteTag={deleteTag}

                               loadImg={loadImg}
                               deleteImg={deleteImg}
                               previewList={previewList}

                               goWrite={goWrite}/>
            }
        </>

    )
}

export default Write;