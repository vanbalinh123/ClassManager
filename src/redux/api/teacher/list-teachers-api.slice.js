import apiSlice from "../api.slice";

const listTeachersApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        listTeachers: builder.query({
            serializeQueryArgs: () => {
                return undefined;
            },
            query: (data) => ({
                url: '/api/teacher/',
                params: data
            }),
        }),
        detailTeacher: builder.query({
            query: (usercode) => ({
                url: `/api/teacher/${usercode}/`,
                // params: data
            }),
        }),
        updateTeacher: builder.mutation({
            query: (dataUpdate) => {
                const usercode = dataUpdate.get('usercode');
                return {
                    url: `/api/teacher/${usercode}/`,
                    method: 'PUT',
                    body: dataUpdate,
                };
            },
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
              const action = apiSlice.util.updateQueryData('listTeachers', undefined, draft => {
                
                const userChange = {
                    usercode: data.get('usercode'),
                    full_name: data.get('full_name'),
                    email: data.get('email'),
                    password: data.get('password'),
                    mobile: data.get('mobile'),
                    usercode: data.get('usercode'),
                    role: data.get('role'),
                    avatar: data.get('avatar').name
                }

                console.log(userChange)
                const index = draft?.findIndex((item) => item.usercode === userChange.usercode);
                console.log(index)
                if (index !== -1) {
                    draft[index] = userChange;
                }
                  
              });
              const patchResult = dispatch(action);
              try {
                  await queryFulfilled;
              } catch {
                  patchResult.undo();
              }
          }
        }),
    })
})

export const {
    useListTeachersQuery,
    useDetailTeacherQuery,
    useUpdateTeacherMutation
} = listTeachersApi