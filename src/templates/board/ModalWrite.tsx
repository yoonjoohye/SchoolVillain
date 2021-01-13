import styled from "@emotion/styled";
import {FlexBox} from "../../../assets/style/Layout.style";
import {css} from "@emotion/core";
import {Color} from "../../../assets/style/Color.style";
import React, {useEffect} from "react";
import {MarkdownBase, MarkdownLg, MarkdownMd, MarkdownMdx, MarkdownSm} from "../../../assets/style/Markdown.style";
import {Tag} from "../../../assets/style/Util";
import {IconBase, IconLg, IconSm} from "../../../assets/style/Icon.style";

const ModalSection = styled.section`
  position: fixed;
  z-index:3;
  background-color:rgba(0,0,0,0.7);
  //background-color:rgba(255,255,255,0.13);
  //backdrop-filter: blur(4px);
  left:0;
  top:0;
  width:100%;
  height:100%;
  ${FlexBox()};
`
const ModalBox = styled.div`
  width: 640px;
  border-radius: 0.3em;
  background-color:white;
  box-shadow:0 10px 10px rgba(0,0,0,0.18);
`
const ModalHeader = styled.div`
  position:relative;
  //border-bottom:1px solid ${Color.gray100};
  padding: 0.8em 1em;
   ${MarkdownMd(Color.black, 600)};
   ${FlexBox()};
`
const ModalFooter = styled.div`
  //padding:1em;
  //border-top:1px solid ${Color.gray100};
`
const ModalBody = styled.div`
  overflow: auto;
  min-height: 50vh; 
  max-height: 60vh;
  padding:30px;
`

interface buttonProps {
    enabled: boolean;
}

const Button = styled.button`
  ${MarkdownMd(Color.white)};
  width:100%;
  height: 50px;
  //border-radius: 0.3em;
  border-radius: 0 0 0.3em 0.3em;
  //margin-top:30px;
  ${(props: buttonProps) => props.enabled ?
    `pointer-events:initial;
     background-color:${Color.purple200};
    ` :
    `pointer-events:none;
     background-color:${Color.purple100};
    `
}
  &:hover{
    background-color: ${Color.purple300};
  }
`
const TextArea = styled.textarea`
  width:100%;
  border:0;
  ${MarkdownMdx()};
  resize: none;
  outline:none;
`

const Input = styled.input`
  width:100%;
  border:0;
  ${MarkdownLg('',500)};
  outline:none;
`
const FileInput = styled.input`
  display:none;
`

interface IFaKeFileInput {
    previewImgCount: number;
}

const FakeFileInput = styled.label<IFaKeFileInput>`
  display:inline-block;
  width:100%;
  height:150px;
  ${FlexBox('column')};  
  ${MarkdownSm(Color.gray200)};
  border-radius: 0.3em;
  background-color:${Color.gray100};
  cursor:pointer;
  &::after{
      margin-top:1em;
      ${(props: IFaKeFileInput) => css`content:'${props.previewImgCount}/6'`};
  }
  &:hover{
    background-color:#e1e1e1;
  }
`
const PreviewImg = styled.div`
  width:100%;
  height:150px;
  display:flex;
  position:relative;
  top:0;
`
const Preview = styled.div`
  display:grid; 
  grid-template-columns: repeat(3, 1fr); 
  grid-gap:1em; 
  text-align:right;
`
const DelButton = styled.button`
  background-color:${Color.gray100};
  ${MarkdownSm(Color.gray200)};
  border-radius: 50%;
  width:1.5em;
  height: 1.5em;
  position: absolute;
  z-index: 2;
  margin-top: -10px;
  margin-left: -13px;
`
const CloseButton = styled.button`
  position:absolute; 
  right:-3em; 
  width:30px;
  height:30px;
  ${FlexBox()};
  //background: ${Color.gray100};
  border-radius: 50%;
  padding:0.6em;
  //&:hover{
  //  background:#e1e1e1;
  //}
`
const Select = styled.select`
    border: 0;
    width: 190px;
    background-image: url(${require('../../../assets/img/icon/dropdown.svg')});
    background-repeat: no-repeat;
    background-position-x: calc(100%);
    background-size: 20px 20px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    ${MarkdownMd('#3D3D3D')};
    &::-ms-expand{ display:none /* 화살표 없애기 for IE10, 11*/ }
`

interface propsType {
    isOpen: any;
    name: string;
    type:string;
    selectType:any;

    title: string;
    changeTitle:any;

    contents: string;
    changeContents: any;

    tag: string;
    tagList: any;
    changeTag: any;
    onEnter: any;
    deleteTag: any;

    loadImg: any;
    deleteImg: any;
    previewList: string[];

    loading: boolean;

    upload: any;
}

const ModalWrite: React.FC<propsType> = ({
                                             isOpen,
                                             name,
                                             type,
                                             selectType,
                                             title,
                                             changeTitle,
                                             contents,
                                             changeContents,
                                             tag,
                                             tagList,
                                             changeTag,
                                             onEnter,
                                             deleteTag,
                                             loadImg,
                                             deleteImg,
                                             previewList,
                                             loading,
                                             upload
                                         }) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, []);
    return (
        <ModalSection>
            <ModalBox>
                <div css={css`position:relative;`}>
                    <CloseButton onClick={() => {
                        isOpen(false);
                        document.body.style.overflow = 'initial';
                    }}>
                        <img css={css`width:100%;`} src={require('../../../assets/img/icon/close.svg')}
                             alt="스쿨빌런 닫기 이미지"/>
                    </CloseButton>
                </div>
                {/*<ModalHeader>*/}
                {/*<p>게시물 {name}</p>*/}
                {/*</ModalHeader>*/}
                <ModalBody>
                    <div css={css`padding:20px 10px; border-bottom: 1px dashed ${Color.gray100};`}>
                        <Select value={type} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => selectType(e)}>
                            <option value="none">주제를 선택해주세요</option>
                            <option value="doodle">담벼락</option>
                            <option value="love">연애상담</option>
                        </Select>
                    </div>
                    <div css={css`padding:20px 10px;`}>
                        <Input value={title}
                               onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeTitle(e)}
                               placeholder="제목을 입력해주세요."/>
                    </div>
                    <div css={css`padding:0 10px 20px 10px; border-bottom:1px dashed ${Color.gray100};`}>
                        <TextArea rows={10} value={contents}
                                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => changeContents(e)}
                                  placeholder="내용을 입력해주세요.">

                        </TextArea>
                    </div>
                    <div css={css`padding:40px 10px 0 10px;`}>
                        <Preview>
                            <FileInput type="file" id="img"
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => loadImg(e)}
                                       accept="image/jpg, image/png, image/jpeg, image/gif" multiple/>
                            {

                                previewList.length > 0 ?
                                    previewList.map((preview: any, index: number) => {
                                        return (
                                            <figure css={css`position:relative;`} key={index}>
                                                <DelButton onClick={() => deleteImg(index)}>
                                                    <img css={css`width:50%;`}
                                                         src={require('../../../assets/img/icon/close.svg')}
                                                         alt="스쿨빌런 닫기 이미지"/>
                                                </DelButton>
                                                <PreviewImg>
                                                    <img
                                                        css={css`width: 100%; height: 100%; border-radius: 0.3em;`}
                                                        src={preview} alt="스쿨빌런 게시판 이미지"/>
                                                </PreviewImg>
                                            </figure>
                                        );
                                    }) : null
                            }
                            {
                                previewList.length < 6 &&
                                <FakeFileInput htmlFor="img" previewImgCount={previewList.length}>
                                    <IconLg
                                        src={require('../../../assets/img/icon/gallery.svg')}
                                        alt="스쿨빌런 사진 이미지"/></FakeFileInput>
                            }
                        </Preview>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {/*<div css={css`margin-bottom:1em;`}>*/}
                    {/*    <Input type="text" value={tag}*/}
                    {/*           onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeTag(e)}*/}
                    {/*           placeholder="#해시태그를 입력해주세요."*/}
                    {/*           onKeyPress={(e: React.KeyboardEvent) => onEnter(e)}/>*/}
                    {/*</div>*/}
                    {/*<div css={css`margin-bottom:1em;`}>*/}
                    {/*    {*/}
                    {/*        tagList ?*/}
                    {/*            tagList.map((item: any, index: number) => {*/}
                    {/*                return (*/}
                    {/*                    <Tag key={index}>*/}
                    {/*                        <span css={css`margin-right:0.5em;`}># {item.tag || item}</span>*/}
                    {/*                        <span css={css`cursor:pointer;`} onClick={() => deleteTag(index)}>X</span>*/}
                    {/*                    </Tag>*/}
                    {/*                )*/}
                    {/*            }) : null*/}
                    {/*    }*/}
                    {/*</div>*/}
                    <Button enabled={type!=='none' && title.length > 0 && contents.length > 0} onClick={upload}>
                        {
                            loading ?
                                <img css={css`height:2em; width:2em;`}
                                     src={require('../../../assets/img/icon/white_spinner.gif')}
                                     alt="스쿨빌런 로딩스피너 이미지"/>
                                :
                                '등록'
                        }
                    </Button>
                </ModalFooter>
            </ModalBox>
        </ModalSection>
    )
}
export default ModalWrite;
