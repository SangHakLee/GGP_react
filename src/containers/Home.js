// src/containers/Home.js
import React from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from 'components';
import { memoPostRequest, memoListRequest } from 'actions/memo';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
    }

	componentDidMount() {
        this.props.memoListRequest(true).then(
            () => {
                console.log('componentDidMount', this.props.memoData);
            }
        );
    }

  /* POST MEMO */
    handlePost(contents) {
        return this.props.memoPostRequest(contents).then(
            () => {
                if(this.props.postStatus.status === "SUCCESS") {
                    // TRIGGER LOAD NEW MEMO
                    // TO BE IMPLEMENTED
                    Materialize.toast('Success!', 2000);
                } else {
                    /*
                        ERROR CODES
                            1: NOT LOGGED IN
                            2: EMPTY CONTENTS
                    */
                    let $toastContent;
                    switch(this.props.postStatus.error) {
                        case 1:
                            // IF NOT LOGGED IN, NOTIFY AND REFRESH AFTER
                            $toastContent = $('<span style="color: #FFB4BA">로그인 먼저 해주세요</span>');
                            Materialize.toast($toastContent, 2000);
                            setTimeout(()=> {location.reload(false);}, 2000);
                            break;
                        case 2:
                            $toastContent = $('<span style="color: #FFB4BA">내용을 써주세요.</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                        default:
                            $toastContent = $('<span style="color: #FFB4BA">에러</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                    }
                }
            }
        );
    }





    render() {
        const write = (
			<Write
				onPost={this.props.handlePost}
			/>
		);

        var testData = [
            {
                "_id": "578b958ec1da760909c263f4",
                "writer": " [공통] K-CESA(대학생 핵심역량진단) 설명회 안내  ",
                "contents": "ACE) K-CESA(대학생 핵심역량진단) 설명회 안내  1. 목적 ○ 대학 전체의 교육력 진단을 위한 사업에 대한 학생 이해도 증진○ 참여학생들의 효율성 및 적극성 확보로 진단결과의 질 향상○ K-CESA를 통한 학생 개인의 커리어 포트폴리오 구성 진단  2. 대상○ 진단 대상자로 선발된 재학생※ 설명회 안내 문자를 받은 학생은 K-CESA 대상자로 선발된 학생이므로 설명회에 가급적 참석하기 바람   3. 강사○ 강사 : 이인재 교수(관광경영학과, 교육과정평",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:22.428Z",
                    "created": "2016-07-17T14:26:22.428Z"
                },
                "starred": []
            },
            {
                "_id": "578b957ec1da760909c263f3",
                "writer": " [공통] [ACE] Gachon 4C Up Zone 조교 채용  ",
                "contents": "Gachon 4C Up Zone 조교 채용  1. 모 집 : 조교 1명 2. 근무부서 : Gachon 4C UP Zone - ACE Office 3. 근무시간 : 09:00 ~ 17:30 (방학중 단축근무 09:00-16:00 ) 4. 근무시작 : 9월중(근무시작일 조율) 5. 업무내용 :    - ACE 장학금 서류 및 예산 정리 작업  - Honors 및 R.C. 프로그램 관련 서류 정리 작업  - G-OKC 촬영 장비 등 정비  - Gachon 4C Up Zone 강의실 정비  - 그외 ACE 사업 관련 업무 지원 6. 급 여 : 가천대학",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:06.999Z",
                    "created": "2016-07-17T14:26:06.999Z"
                },
                "starred": []
            },
            {
                "_id": "578b957cc1da760909c263f2",
                "writer": " [공통] 2016학년도 2학기 수강포기 안내  ",
                "contents": " 2016학년도 2학기 수강포기 안내  1. 기간 : 2016. 9. 22(목) 09:00 ~ 9. 28(수) 24:00 <7일간> 2. 절차 : 홈페이지(로그인) → 학사행정 → 학부학사 → 수업관리 → 수강신청포기   → ‘포기신청을 하시겠습니까?’에서 예(Y)를 클릭 → 결과 확인  3. 유의사항  가. 수강신청 포기한 교과목은 성적표 및 성적증명서에 포기(W)로 처리하나 성적평점에 포함되지 않음  ※졸업예정자와 졸업자 성적증명서에는 수강포기(W) 기록 없이 성적증명서 발급",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:04.195Z",
                    "created": "2016-07-17T14:26:04.195Z"
                },
                "starred": []
            },
            {
                "_id": "578b9579c1da760909c263f1",
                "writer": " [글로벌] 미국 실리콘밸리 방문학생 인턴십 프로그램 설명회  ",
                "contents": "  미국 실리콘밸리 방문학생 인턴십 프로그램  설명회     2017학년도 1학기 미국 실리콘밸리 방문학생 인턴십 프로그램의 설명회를 아래와 같이 진행하오니 많은 참여 부탁드립니다.    일 시 : 2016. 9. 20(화) 오후 5시장 소 : 가천관 940호내 용 : 프로그램 소개, 선발내용 설명, 1기 파견학생과의 질의응답문 의 : 국제교류처 (031-750-5673) *본 프로그램의 모집공고는 아래 링크를 참고 바랍니다:   참가자 모집 공고 바로가기   국 제 교 류 처    ",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:01.062Z",
                    "created": "2016-07-17T14:26:01.062Z"
                },
                "starred": []
            },
            {
                "_id": "578b9576c1da760909c263f0",
                "writer": " [공통] [ACE] 2학기 ‘힐링 멘토링’ 멘토 추가모집  ",
                "contents": " [ACE] 2학기 ‘힐링 멘토링’ 멘토 추가모집  힐링 멘토링이란 학업, 진로, 학교생활, 건강, 취업문제에서 받는 스트레스와 고민에 대해 멘토와 함께 나누고 해결, 성장해 나감으로서 건강하고 행복한 학교생활이 되도록 도와주는 활동입니다. 2016-2학기 ‘힐링 멘토링’ 참가자를 다음과 같이 모집합니다. 1. 모집대상:   멘토-본교 3학년 이상 재학생, 대학원생, 졸업생, 교직원, 교수   ＊멘토 지원자는 멘토교육 동영상 보내드립니다. 2. 선발인원: 00명3. 지원자",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:25:58.619Z",
                    "created": "2016-07-17T14:25:58.619Z"
                },
                "starred": []
            },
            {
                "_id": "578b8c82c1da760909c263ef",
                "writer": " [공통] 3D프린터를 활용한 창업 시제품제작 교육 수강생 모집  ",
                "contents": " 3D프린터를 활용한 창업 시제품제작 교육 수강생 모집  가천대학교 재학생들을 대상으로 3D 프린터를 활용한 시제품제작 교육생을 모집합니다.3D 프린터의 기초에서부터 설계, 시제품 제작, 후가공까지 3D 프린터의 모든 것을 경험해 볼 수 있으니 많은 관심과 참여 바랍니다. 1. 교육기간 및 모집기간구분교육기간모집기간수강안내1차09월 26일(월) ~ 09월 29일(목)~9월 22일(목)9월 23일(금)2차10월 04일(화) ~ 10월 07일(금)~9월 29일",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T13:47:46.611Z",
                    "created": "2016-07-17T13:47:46.611Z"
                },
                "starred": []
            }
        ];

        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? write : undefined }
                <MemoList data={this.props.memoData} currentUser={this.props.currentUser}/>
            </div>
        );
    }
}

// <MemoList data={testData} currentUser="hak"/> // 테스트 데이터


const mapStateToProps = (state) => {
    console.log('state', state)
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post,
		currentUser: state.authentication.status.currentUser,
        memoData: state.memo.list.data
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents));
        },
		memoListRequest: (isInitial, listType, id, username) => {
            return dispatch(memoListRequest(isInitial, listType, id, username));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
