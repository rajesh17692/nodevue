import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs/index'
import CreateSong from '@/components/CreateSong'
import EditSong from '@/components/EditSong'
import ViewSong from '@/components/ViewSong/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'songs'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/song/:songId',
      name: 'song',
      component: ViewSong
    },
    {
      path: '/song/:songId/edit',
      name: 'song-edit',
      component: EditSong
    },
    {
      path: '/songs/create',
      name: 'song-create',
      component: CreateSong
    }
  ],
  mode: 'history'
})
